import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context API 적용
import WritingMessage from "./WritingMessage.js";
import Character from "../../../Assets/img/Character.png";
import CheckedMessage from "./CheckedMessage.js";
import { useUserData } from "../../../contexts/userContext";
import axios from "axios";
import Clock from "../../../Assets/img/Clock.svg";
import Paper from "../../../Assets/img/Paper.svg";
import Peaple from "../../../Assets/img/Peaple.svg";
import Modal from "../Web_Login_Components/Modal/Modal.js";

function RightSide({ under100, updateLeftSide, setUpdateLeftSide, boardId }) {
  const theme = useTheme();
  const [userData, setUserData] = useUserData();
  const uid = userData.uid;
  const [clickstate, setClickstate] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  //돈을 빌려준 경우(안빌려줌-> 빌려줌-> 관리)
  const [debtIdgnum, SetDebtIdgnum] = useState("");

  //메시지 전송했으면 오른쪽 화면바뀜
  const [checkSendMessage, setCheckSendMessage] = useState(false);

  useEffect(() => {
    console.log(debtIdgnum, "변경됨");
    setUpdateLeftSide(!updateLeftSide);
  }, [checkSendMessage]);

  useEffect(() => {
    axios
      .get(`https://moneyglove.site:8080/api/v23/debts/boards/${boardId}`)
      .then((response) => {
        console.log("데이터를 받아오는중: ", response);

        const debtDataArray = response.data.data || [];

        const finduid = debtDataArray.map((item, index) => {
          const num = debtDataArray[index];
          const getuid = num.user.uid;

          if (getuid === uid) {
            const getdebtid = num.id;
            SetDebtIdgnum(getdebtid);
            return getdebtid;
          }
        });
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류 발생: ", error);
        // 오류를 처리합니다.
      });
  }, [boardId]);

  const navigate = useNavigate();

  // 버튼 활성화 여부를 결정할 상태 추가
  const [isButtonDisabled, setIsButtonDisabled] = useState(under100);
  useEffect(() => {
    setIsButtonDisabled(under100);
  }, [under100]);

  //console.log("빌려주기 버튼 상태",isButtonDisabled)

  const handleBurrowConfirmation = (event) => {

    if (uid) {
      // 만약 uid가 참값(즉, false가 아님)이라면 도와주기 버튼 클릭 로직 실행
      setClickstate(!clickstate);
    } else {
      // 만약 uid가 false라면, 로그인 페이지로 이동
      navigate("/Login");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {debtIdgnum === "" ? (
                        <WritingMessage
                        checkSendMessage={checkSendMessage}
                        setCheckSendMessage={setCheckSendMessage}
                        boardId={boardId}
                      />
        ) : clickstate === false ? (
          <>
            <GuideMessage>
              <OrangeText>도와줄지 걱정 되시나요?</OrangeText>
              <GraySubText>걱정마세요! 머니글러브가 함께합니다!</GraySubText>
              <ImageRowDiv>
                  <ImageColumnDiv>
                      <ImageSize src={Clock} alt="시계 아이콘"></ImageSize>
                      <TextDiv>
                          <GraySmallText>이메일로</GraySmallText> <OrangeSmallText>대신 리마인드</OrangeSmallText>
                      </TextDiv>
                      <TextDiv> 
                          <OrangeSmallText>알람</OrangeSmallText>
                          <GraySmallText>을 친구에게 보내줘요.</GraySmallText>
                      </TextDiv>
                  </ImageColumnDiv>
                  <ImageColumnDiv>
                      <ImageSize src={Paper} alt="종이 아이콘"></ImageSize>
                      <TextDiv>
                          <GraySmallText>법적 절차 진행시 해당 기록은</GraySmallText>
                      </TextDiv>
                      <TextDiv>
                          <OrangeSmallText>차용증의 역할</OrangeSmallText><GraySmallText>을 해줘요.</GraySmallText>
                      </TextDiv>
                  </ImageColumnDiv>
                  <ImageColumnDiv style={{border: "none"}}>
                      <ImageSize src={Peaple} alt="사람들 아이콘"></ImageSize>
                      <TextDiv>
                          <OrangeSmallText>1:n 채무 체결 형식</OrangeSmallText>
                          <GraySmallText>으로 </GraySmallText>
                      </TextDiv>
                      <TextDiv>
                          <GraySmallText>금액의 부담감을 줄여줘요.</GraySmallText>
                      </TextDiv>
                    </ImageColumnDiv>
                </ImageRowDiv> 
                {uid !== "" ? (
                  <OrangeBtn 
                    onClick={handleBurrowConfirmation}
                    disabled={isButtonDisabled}
                  >
                    나도 도울게요
                  </OrangeBtn> 
                ) : (
                  <>
                    <OrangeBtn 
                      onClick={() => setModalShow(!modalShow)}
                      disabled={isButtonDisabled}
                    >
                      나도 도울게요
                    </OrangeBtn>
                    <div id="modal"></div>
                    {modalShow && (
                      <Modal
                        setModalShow={setModalShow}
                        setNextStep={handleBurrowConfirmation}
                        content1="로그인이 필요해요!"
                        content2="확인을 누르면 로그인 페이지로 이동할게요."
                        buttonContent="확인"
                        close={true}
                      />
                    )}
                  </>
                )}
            </GuideMessage>
            
          </>
        ) : (
          <WritingMessageContainer>
            {debtIdgnum === "" ? (
              <WritingMessage
                checkSendMessage={checkSendMessage}
                setCheckSendMessage={setCheckSendMessage}
                boardId={boardId}
              />
            ) : (
              <CheckedMessage debtIdgnum={debtIdgnum} />
            )}
          </WritingMessageContainer>
        )}
      </Container>
    </ThemeProvider>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
  margin-top: 7.75rem;
`;

const WritingMessageContainer = styled.div`
  animation: ${fadeIn} 0.8s ease;
`;

const GuideMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 29.25rem;
    height: 21.25rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #FAFAFA;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
    margin-left: 1.25rem;
    align-items: center;
`;

const OrangeText = styled.div`
    display: flex;
    width: 11rem;
    height: 1.625rem;
    flex-shrink: 0;
    color: var(--primary_orange, #FF3D00);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    background: #D9D9D9;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 1.26rem;
    
`;

const OrangeBtn = styled.button`
    width: 26.125rem;
    height: 2.5rem;
    flex-shrink: 0;  
    border-radius: 0.375rem;
    background: ${(props) => (props.disabled ? "#D9D9D9" : "#FF3D00")};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    color: #FFFCFB;
    text-align: right;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 2.94rem;
    cursor: pointer;
`;

const GraySubText =styled.div`
    display: flex;
    color: #8A8A8A;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 1.56rem;
`;

const ImageRowDiv =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1.81rem;
`;

const ImageColumnDiv =styled.div`
    display: flex;
    flex-direction: column;
    width: 9.25rem;
    height: 6.5rem;
    align-items: center;
    border-right: 1px solid #DCDCDC;
`;

const ImageSize =styled.img`
 display: flex;
 width: 3rem;
    height: 3.0625rem;
    flex-shrink: 0;
    margin-bottom: 1.31rem;
`;

const TextDiv =styled.div`
    display: flex;
    flex-direction: row;
`

const GraySmallText =styled.span`
    display: flex;
    color: #8A8A8A;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

`;

const OrangeSmallText =styled.span`
    display: flex;
    color: var(--primary_orange, #FF3D00);
    font-family: Pretendard;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export default RightSide;
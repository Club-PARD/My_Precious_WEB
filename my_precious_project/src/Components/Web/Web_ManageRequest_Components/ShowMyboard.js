import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { Context } from "react-responsive";
import styled from "styled-components";
import ImageX from "../../../Assets/img/ImageX.png";
import { useUserData } from "../../../contexts/userContext";
import Show from "../../../Assets/img/Show.svg";
import BlueCharacter from "../../../Assets/img/BlueCharacter.svg";
import CheckBox from "../../../Assets/img/CheckBox.svg";

function ShowMyboard(manageData) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useUserData();
  const uid = userData.uid;

  console.log(manageData);

  const openModal = () => {
    //스크롤 비활성화
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
  };

  const closeModal = () => {
    //스크롤 활성화
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
  };

  const MoneyNum = manageData.manageData.borrowMoney?.toLocaleString();

  const formatted_date =
    manageData.manageData.payDate.substring(0, 4) +
    "년 " +
    manageData.manageData.payDate.substring(4, 6) +
    "월 " +
    manageData.manageData.payDate.substring(6) +
    "일";
  const formatted_date2 =
    manageData.manageData.payDate.substring(0, 4) +
    "." +
    manageData.manageData.payDate.substring(4, 6) +
    "." +
    manageData.manageData.payDate.substring(6);

  return (
    <div>
      <ShowMoreBtn onClick={openModal}>
        <img src={Show} alt="전체보기 아이콘" /> 내가 쓴 글 전체보기
      </ShowMoreBtn>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customModalStyles}
      >
        <ContextDiv>
          <ImageXBtn onClick={closeModal} />
          <BlueImage alt="파란색 캐릭터 이미지" />
          <HeaderText>
            친구에게 돈을 빌리는 것은 당연한 게 아니에요! <br></br>예쁜 말로
            정중히 부탁해보는 건 어떨까요?
          </HeaderText>
          <CenterContents>
            <DisplayBoxDiv>
              <Line style={{ height: "2.4375rem", }}>
                <DarkGrayText>제목</DarkGrayText>
                <DisplayDataTitleDiv>
                  <DisplayDataTitleText style={{alignItems:"center"}}>
                    {manageData.manageData.title}
                  </DisplayDataTitleText>
                </DisplayDataTitleDiv>
              </Line>
              <Line style={{ height: "8.6875rem" }}>
                <DarkGrayText>사유</DarkGrayText>
                <DisplayDataReasonDiv>
                  <DisplayDataReasonText>
                    {manageData.manageData.situation}
                  </DisplayDataReasonText>
                </DisplayDataReasonDiv>
              </Line>
              <Line>
                <DarkGrayText>상환 계획</DarkGrayText>
                <DisplayDataReasonDiv style={{height: "4.375rem"}}>
                  <DisplayDataReasonText>
                    {manageData.manageData.situation}
                  </DisplayDataReasonText>
                </DisplayDataReasonDiv>
              </Line>
              <Line >
                <DarkGrayText style={{ height: "2.4375rem" }}>
                  필요 금액
                </DarkGrayText>
                <DisplayDataTotalDiv>
                  <DisplayDataTotalText>{MoneyNum} 원</DisplayDataTotalText>
                </DisplayDataTotalDiv>
              </Line>
              <Line style={{ height: "2.4375rem" }}>
                <DarkGrayText>갚을 날짜</DarkGrayText>
                <DisplayDataTotalDiv>
                  <DisplayDataTotalText>{formatted_date2}</DisplayDataTotalText>
                </DisplayDataTotalDiv>
              </Line>
              <Line style={{ justifyContent: "start" }}>
                <DarkGrayText
                  style={{ height: "2.4375rem", marginRight: "1.46rem",}}
                >
                  받을 계좌
                </DarkGrayText>
                <DisplayDataTotalDiv
                  style={{ width: "13rem", marginRight: "1.3rem" }}
                >
                  <DisplayDataTotalText>
                    {manageData.manageData.bank}
                  </DisplayDataTotalText>
                </DisplayDataTotalDiv>
                <DisplayDataTotalDiv style={{ width: "23.1875rem" }}>
                  <DisplayDataTotalText>
                    {manageData.manageData.bankAccount}
                  </DisplayDataTotalText>
                </DisplayDataTotalDiv>
              </Line>
              <SignDiv>
                <SignText>서약</SignText>
                <SignText>
                  나 {manageData.manageData.name}(은)는 {formatted_date}
                  까지 돈을 갚을 것을 약속합니다.
                </SignText>
                <img src={CheckBox} alt="체크박스 이미지"></img>
              </SignDiv>
            </DisplayBoxDiv>
          </CenterContents>
        </ContextDiv>
      </Modal>
    </div>
  );
}

//overlay는 모달 창 바깥 부분, content는 모달 창부분
const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "54.625rem",
    height: "40.75rem",
    padding: "0",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.875rem",
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    overflow: "auto",
    border: "none",
  },
};

const ShowMoreBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.1875rem;
  border: 1px solid #ff6a3b;
  width: 10.3125rem;
  height: 1.8125rem;
  flex-shrink: 0;
  background-color: #f1f1f1;
  gap: 0.38rem;
  padding: 0;

  color: #ff6a3b;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem; /* 142.857% */
  cursor: pointer;
`;

const ContextDiv = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  width: 54.625rem;
  flex-shrink: 0;
  position: relative;
  margin-top: 2.37rem;
`;

const ImageXBtn = styled.button`
  position: absolute;
  width: 1.1875rem;
  height: 1.19113rem;
  flex-shrink: 0;
  background-image: url(${ImageX});
  background-repeat: no-repeat;
  background-size: contain;
  top: -3%;
  left: 92%;
  z-index: 0;
  display: flex;
  border: none;
  cursor: pointer;
`;

const HeaderText = styled.div`
  color: var(--primary_orange, #ff3d00);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.1875rem; /* 125% */
  letter-spacing: -0.0875rem;
  padding-left: 9%;
`;

const BlueImage = styled.div`
  display: flex;
  width: 6.75525rem;
  height: 6.75525rem;
  position: absolute;
  background-image: url(${BlueCharacter});
  background-repeat: no-repeat;
  background-size: contain;
  top: -5%;
  left: 7%;
  z-index: 0;
  display: flex;
`;

const CenterContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DisplayBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 43rem;
  //height: 29.1875rem;
  margin-top: 1.64rem;
  //justify-content: center;
  //align-items: start;
  gap: 0.56rem;
`;

const Line = styled.div`
  width: 43.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DarkGrayText = styled.div`
  display: flex;
  color: #6a6a6a;

  color: #6a6a6a;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4375rem; /* 243.75% */
`;

const DisplayDataDiv = styled.div`
  display: flex;
  width: 37.5625rem;
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #E0E0E0;
  background: #fafafa;
  overflow: auto;
`;

const DisplayDataText = styled.div`
  display: flex;
  color: #6a6a6a;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0.875rem 2.25rem 0.875rem 1.3125rem;
  //align-items: center;
  //overflow: auto;
`;

const DisplayDataTitleDiv = styled(DisplayDataDiv)`
  height:  2.4375rem;
`;

const DisplayDataTitleText = styled(DisplayDataText)`
  display: flex;
  //margin: 0.31rem 2.25rem 0.31rem 1.3125rem;
  //margin: 0rem 2.25rem 0rem 1.3125rem;
  width: 100%;
`;

const DisplayDataReasonDiv = styled(DisplayDataDiv)`
  height: 8.6875rem;
`;

const DisplayDataReasonText = styled(DisplayDataText)`
  color: var(--grey-grey-6-secondary, #504f4f);
  text-align: right;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem;
  width: 100%;
`;

const DisplayDataTotalDiv = styled(DisplayDataDiv)`
  height: 2.4375rem;
  justify-content: end;
  align-items: center;
`;
const DisplayDataTotalText = styled.div`
  color: var(--grey-grey-6-secondary, #504f4f);
  text-align: right;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 243.75% */
  padding-right: 2.69rem;
`;

const SignDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  height: 5rem;
`;

const SignText = styled.div`
  display: flex;
  color: #a5a5a5;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 216.667% */
`;

export default ShowMyboard;

import React, { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import axios from "axios";
import { useUserData } from "../../../contexts/userContext";
import SentToEmailModal from "../Web_RequestDetail_Components/Modal/SentToEmailModal.js";

// 글읽기 페이지에서 채권자 입장(로그인 상태-> 빌려준 상태)
function DisplayFriend({ displayData, debtId }) {
  const theme = useTheme();
  const [userData, setUserData] = useUserData();
  const [send, setSend] = useState(false);
  const uid = userData.uid;
  console.log(displayData.id);

  //모달에 보낼 props값 - 감사편지
  const Modal_ThankU = {
    function: "감사편지",
    subHeader: "당신이 힘들 때 도움 준 친구에게 감사한 마음을 전해보아요.",
    longplacehorder:
      "머글님께서 힘들 때 도움을 준 친구에게 감사함을 전해보세요. MoneyGlove를 통해 돈을 빌려준 친구는 이자율도 없으며 금전적 이득을 위함이 아닌, 오로지 머글님을 걱정하는 마음을 가지고 도와주는 우정이 넘치는 친구입니다. 금액은 중요하지 않습니다. 자신의 상황에 최대의 금액을 보내준 친구에게 감사함을 전해주세요.",
    sendToEmail: displayData?.gmailId,
  };

  const CheckDebtStatusSubmit = (event) => {
    // 기본 양식 제출 동작 방지
    event.preventDefault();

    axios
      .patch(
        `http://13.209.230.190/api/v23/debts/check-paid-boxes/${displayData.id}`,
        { debtStatus: displayData.id }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류 발생: ", error);
      });

    if (displayData.debtStatus === "PENDING") {
      setSend(false);
    } else {
      setSend(true);
    }
  };
  console.log(displayData);

  //빌려준 돈 숫자에서 문자 -> 컴마 추가
  var receiveNumber = parseFloat(displayData?.lendMoney);
  var formattedNumber = receiveNumber.toLocaleString();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ContentsDiv>
          <HeaderDiv>
            <Name>{displayData?.name} 님</Name>
          </HeaderDiv>
          <DetailDiv>
            <GrayText>응원메시지</GrayText>
            <DisplayBorrowDiv>
              <DisplayBorrowText>{displayData?.message}</DisplayBorrowText>
            </DisplayBorrowDiv>
          </DetailDiv>
          <DetailDiv style={{ marginTop: "0.56rem" }}>
            <GrayText>빌려준 금액</GrayText>
            <DisplayBorderText>{formattedNumber} 원</DisplayBorderText>
          </DetailDiv>
          <DetailDiv style={{ marginTop: "0.56rem" }}>
            <GrayText>돌려받을 계좌</GrayText>
            <DisplayBorderText>
              {displayData?.bank} {displayData?.bankAccount}
            </DisplayBorderText>
          </DetailDiv>
        </ContentsDiv>
        <Div>
          <SentToEmailModal props={Modal_ThankU} />
          <CheckBtn
            style={{
              disable: displayData.debtStatus === "PAID" ? true : false,
              backgroundColor:
                displayData.debtStatus === "PAID" ? "#B3B3B3" : "#FF3D00",
              cursor: displayData.debtStatus === "PAID" ? "default" : "pointer",
            }}
            onClick={CheckDebtStatusSubmit}
          >
            돈을 다 갚았어요
          </CheckBtn>
        </Div>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 31.1875rem;
  height: 19.9375rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: var(--White_2, #fafafa);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const ContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 26.435rem;
  padding-top: 1.81rem;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.75rem;
`;

const Name = styled.div`
  display: flex;
  color: var(--grey-grey-6-secondary, #504f4f);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.1875rem; /* 95% */
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GrayText = styled.div`
  display: flex;
  color: var(--grey-Grey_4, #8e8e8e);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 278.571% */
`;

const DisplayBorrowDiv = styled.div`
  display: flex;
  width: 20.5rem;
  height: 3.5rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid var(--grey-Grey_2, #d9d9d9);
  //background: #FAFAFA;
  overflow: auto;
`;

const DisplayBorrowText = styled.div`
  display: flex;
  color: var(--grey-Grey_5, #696666);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  margin: 0.5rem 0.9rem 0.5rem 0.9rem;
  width: 100%;
`;

const DisplayBorderText = styled.div`
  display: flex;
  width: 19.56rem;
  height: 2.4375rem;
  border-radius: 0.625rem;
  border: 1px solid var(--grey-Grey_2, #d9d9d9);

  flex-shrink: 0;
  color: #696969;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem;
  justify-content: end;
  padding-right: 0.94rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 30rem;
  justify-content: end;
  padding-top: 1.44rem;
  align-items: center;
  width: 23.5rem;
  gap: 0.75rem;
  padding-left: 2.5rem;
`;

const CheckBtn = styled.button`
  display: flex;
  width: 12.6875rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #ff3d00;
  border: none;
  align-items: center;
  justify-content: center;
  color: #fffcfb;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem;
  padding: 0;
  cursor: pointer;
`;

export default DisplayFriend;

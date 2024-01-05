import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js.js"; // Context APi 적용
import SmallLineProgress from "./SmallLineProgress.js";
import Character from "../../../Assets/img/Character.png";
import Talk from "../../../Assets/img/Talk.svg";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 54.625rem;
  height: 14.3125rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #FAFAFA;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const DisplayMoneyContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DisplayMoneyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.46875rem;
  padding-top: 1.56rem;
`;

const MoneyText = styled.div`
  display: flex;
  color: #3e3e3e;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 0.76rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  color: #5b5b5b;
  align-items: center;

  text-align: right;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-top: 0.36rem;
`;

const Circle = styled.div`
  width: 0.4375rem;
  height: 0.4375rem;
  flex-shrink: 0;
  border: none;
  background-color: #fc511c;
  border-radius: 50%;
  margin-right: 0.25rem;
`;

const RightRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #5b5b5b;
  text-align: right;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-items: center;
`;

const UnderGrayDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2.19rem;
  padding-left: 1.94rem;
  gap: 0.5rem;
  justify-content: center;
`;

const UnderGrayFirstDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #696969;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Dday = styled.div`
  display: flex;
  width: 5.1875rem;
  height: 1.375rem;
  flex-shrink: 0;
  border-radius: 0.4375rem;
  border: 1px solid #ff3d00;
  color: #ff3d00;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 1.25rem;
`;

const ImageCharacter = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
  background-image: url(${Character});
  background-repeat: no-repeat;
  background-size: contain;
  top: 3%;
  left: 76%;
  z-index: 1;
  display: flex;
`;

const ImageTalk = styled.div`
  position: absolute;
  background-image: url(${Talk});
  background-repeat: no-repeat;
  background-size: contain;
  top: 0%;
  left: 82%;
  z-index: 1;
  display: flex;
  width: 11rem;
  height: 3.9375rem;
  flex-shrink: 0;
  //justify-content: center;
`;

const TalkText = styled.div`
  display: flex;
  color: #5b5b5b;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 8.6rem;
  height: 2.2rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
`;

function ManageSummary({ manageData, boardId }) {
  const theme = useTheme();

  const [BorrowDataSet, setBorrowDataSet] = useState([]);
  const [totalRepayMoney, setTotalRepayMoney] = useState(0);

  console.log("확인",totalRepayMoney);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://moneyglove.site:8080/api/v23/debts/confirmedDebts/${boardId}`
      );
      const borrowData = response.data.data;
      if (borrowData) {
        const transformedBorrowData = borrowData.map((item) => {
          return {
            id: item.id,
            lendMoney: item.lendMoney,
            repaymentStatus: item.repaymentStatus,
          };
        });
        setBorrowDataSet(transformedBorrowData);

        const mapRepay = transformedBorrowData.map((value, index) => {
          return parseFloat(value.lendMoney);
        });
        const totalRepayMoney = mapRepay.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        setTotalRepayMoney(totalRepayMoney);

        console.log(transformedBorrowData);
      }
    } catch (error) {
      console.error("API에서 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [manageData.totalLendmoney]);


  //받은 돈 숫자에서 문자 -> 컴마 추가
  var receiveNumber = parseFloat(manageData.totalLendmoney);
  if (receiveNumber !== undefined) {
    var LendformattedNumber = receiveNumber.toLocaleString();
  }

  //필요한 돈 숫자에서 문자 -> 컴마 추가
  var totaleNumber = parseFloat(manageData.borrowMoney);
  if (totaleNumber !== undefined) {
    var NeedformattedNumber = totaleNumber.toLocaleString();
  }

  var ConfirmNumber = parseFloat(totalRepayMoney);
  if (ConfirmNumber !== undefined) {
    var ConfirmformattedNumber = ConfirmNumber.toLocaleString();
  }

  const formatted_date =
  manageData.payDate.substring(0, 4) + "년 " + manageData.payDate.substring(4, 6) +
  "월 " + manageData.payDate.substring(6) +
  "일";

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageCharacter />
        <ImageTalk>
          <TalkText>
            현재까지 {BorrowDataSet.length}명의 친구에게 돈을 갚았어요.
          </TalkText>
        </ImageTalk>
        <DisplayMoneyContainer>
          <DisplayMoneyDiv style={{ paddingLeft: "1.62em" }}>
            <MoneyText>현재까지 모인 금액</MoneyText>
            <SmallLineProgress
              total={parseFloat(manageData.borrowMoney)}
              receive={parseFloat(manageData.totalLendmoney)}
            />
            <Row>
              <Circle /> 모인 금액 {LendformattedNumber}
            </Row>
          </DisplayMoneyDiv>
          <DisplayMoneyDiv style={{ paddingLeft: "4.31rem" }}>
            <MoneyText>갚은 금액</MoneyText>
            <SmallLineProgress
              total={parseFloat(manageData.totalLendmoney)}
              receive={parseFloat(totalRepayMoney)}
            />
            <RightRowDiv>
              <Row>
                <Circle />
                갚은 금액 {ConfirmformattedNumber}
              </Row>
            </RightRowDiv>
          </DisplayMoneyDiv>
        </DisplayMoneyContainer>
        <UnderGrayDiv>
          <UnderGrayFirstDiv>
            <div style={{ paddingRight: "5.13rem" }}>필요 금액</div>
            <div>{NeedformattedNumber} 원</div>
          </UnderGrayFirstDiv>
          <UnderGrayFirstDiv>
            <div style={{ paddingRight: "1.44rem" }}>갚기로 한 약속날짜</div>
            <div>{formatted_date}</div>

            {manageData.dday >= 0 ? (
              <Dday>D-{manageData.dday}</Dday>
            ) : (
              <Dday>D+{Math.abs(manageData.dday)} </Dday>
            )}
          </UnderGrayFirstDiv>
        </UnderGrayDiv>
      </Container>
    </ThemeProvider>
  );
}

export default ManageSummary;
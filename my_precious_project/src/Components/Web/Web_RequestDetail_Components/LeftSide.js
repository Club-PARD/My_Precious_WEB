import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import LineProgress from "./LineProgress.js";
import Talk from "../../../Assets/img/Talk.svg";
import CheckBox from "../../../Assets/img/CheckBox.svg";
import axios from "axios";
import Character from "../../../Assets/img/Character.png";
import { useParams } from "react-router-dom";

function LeftSide({ under100, setUnder100, updateLeftSide, boardId }) {
  const theme = useTheme();

  const [detailData, setDetailData] = useState({
    borrowMoney: "", //프로그레스바 전체(흰색부분)
    totalLendmoney: "", //프로그레스바 채워진 부분(주황색)
    bank: "",
    bankAccount: "",
    boardStatus: "",
    dday: "",
    debts: "",
    payDate: "",
    payWay: "",
    situation: "",
    title: "",
    name: "",
    gmailId: "",
    uid: "",
    lendMoneyCount: 0, // 빌려준 친구의 수
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://13.209.230.190/api/v23/boards/${boardId}`
      );
      const borrowData = response.data.data;
      let transformedBorrowData = {
        id: borrowData.id,
        title: borrowData.title,
        borrowMoney: borrowData.borrowMoney,
        payDate: borrowData.payDate,
        situation: borrowData.situation,
        payWay: borrowData.payWay,
        bank: borrowData.bank,
        bankAccount: borrowData.bankAccount,
        boardStatus: borrowData.boardStatus,
        user: {
          name: borrowData.user.name,
          gmailId: borrowData.user.gmailId,
          uid: borrowData.user.uid,
        },
        debts: borrowData.debts.map((dept) => ({
          lendMoney: dept.lendMoney,
        })),
        dday: borrowData.dday,
      };

      //빌려준 친구 수 가져옴
      const lendMoneyCount = parseFloat(transformedBorrowData.debts.length);

      // 빌린돈 더하기
      const maplend = transformedBorrowData.debts.map((value, index) => {
        return parseFloat(value.lendMoney);
      });
      const totalLendmoney = maplend.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      setDetailData((prevManageData) => ({
        ...prevManageData,
        borrowMoney: transformedBorrowData.borrowMoney, //프로그레스바 전체(흰색부분)
        totalLendmoney: totalLendmoney, //프로그레스바 채워진 부분(주황색)
        bank: transformedBorrowData.bank,
        bankAccount: transformedBorrowData.bankAccount,
        boardStatus: transformedBorrowData.boardStatus,
        dday: transformedBorrowData.dday,
        debts: transformedBorrowData.debts,
        payDate: transformedBorrowData.payDate,
        payWay: transformedBorrowData.payWay,
        situation: transformedBorrowData.situation,
        title: transformedBorrowData.title,
        name: transformedBorrowData.user.name,
        gmailId: transformedBorrowData.user.gmailId,
        uid: transformedBorrowData.user.uid,
        lendMoneyCount: lendMoneyCount, // 빌려준 친구의 수
      }));
    } catch (error) {
      console.error("API에서 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   //GET 요청 보내기
  //   axios
  //     .get(
  //       `http://13.209.230.190/api/v23/boards/${boardId}`
  //     )
  //     .then((response) => {
  //       console.log("response: " , response.data.data);

  //       //서버에서 받은 데이터 추출
  //       const requestdetailData = response.data.data;
  //       let transformedRequestdetail = {
  //         bank: requestdetailData.bank,
  //         bankAccount: requestdetailData.bankAccount,
  //         boardStatus: requestdetailData.boardStatus,
  //         borrowMoney: parseFloat(requestdetailData.borrowMoney),
  //         dday: requestdetailData.dday,
  //         debts: requestdetailData.debts.map((dept) => ({
  //           lendMoney: dept.lendMoney,
  //         })),
  //         payDate: requestdetailData.payDate,
  //         payWay: requestdetailData.payWay,
  //         situation: requestdetailData.situation,
  //         title: requestdetailData.title,
  //         user: {
  //           name: requestdetailData.user.name,
  //           gmailId: requestdetailData.user.gmailId,
  //           uid: requestdetailData.user.uid,
  //         },
  //       };

  //       //setDetailData(transformedRequestdetail);

  //       setDetailData((detailData) => ({
  //         ...detailData,
  //         lendMoneyCount: lendMoneyCount,
  //         totalLendmoney: totalLendmoney,
  //         bank:transformedRequestdetail.bank,
  //         bankAccount:transformedRequestdetail.bankAccount,
  //         boardStatus:transformedRequestdetail.boardStatus,
  //         borrowMoney:transformedRequestdetail.borrowMoney,
  //         dday:transformedRequestdetail.dday,
  //         debts:transformedRequestdetail.debts,
  //         payDate:transformedRequestdetail.payDate,
  //         payWay:transformedRequestdetail.payDate,
  //         situation:transformedRequestdetail.situation,
  //         title:transformedRequestdetail.title,
  //         name:transformedRequestdetail.user.name,
  //         gmailId:transformedRequestdetail.user.gmailId,
  //         uid:transformedRequestdetail.user.uid
  //       }));

  //     })
  //     .catch((error) => console.log("error: " + error));
  // }, [updateLeftSide]);

  //날짜처리
  const formatted_date =
    detailData.payDate.substring(0, 4) +
    "년 " +
    detailData.payDate.substring(4, 6) +
    "월 " +
    detailData.payDate.substring(6) +
    "일";

  //받은 돈 숫자에서 문자 -> 컴마 추가
  var receiveNumber = detailData.totalLendmoney;
  var formattedNumber = receiveNumber.toLocaleString();

  //필요한 돈 숫자에서 문자 -> 컴마 추가
  var totaleNumber = detailData.borrowMoney;
  var formattedNumber2 = totaleNumber.toLocaleString();

  //모은 돈이 받길 원하는 돈을 넘었을 때 돈 빌려주기 작성 버튼 비활성화를 위한 상태 설정
  useEffect(() => {
    // total과 collect을 이용하여 퍼센트 계산
    const percent = (detailData.totalLendmoney / detailData.borrowMoney) * 100;

    // 100% 이상인 경우
    if (percent >= 100) {
      setUnder100(true);
    } else {
      setUnder100(false);
    }
  }, [detailData.borrowMoney, detailData.totalLendmoney]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TotalColletMoney>현재까지 모인 금액</TotalColletMoney>
        <ImageCharacter />
        <Image>
          <ImageText>
            현재까지 {detailData.lendMoneyCount}명의 친구가 함께 도와주고
            있어요.
          </ImageText>
        </Image>
        <StyleLineProgress>
          <LineProgress
            total={parseFloat(detailData.borrowMoney)}
            receive={parseFloat(detailData.totalLendmoney)}
          />
        </StyleLineProgress>
        <Row>
          <Circle></Circle>
          <ReceivedMoney>{formattedNumber}원 모였어요</ReceivedMoney>
        </Row>

        <DisplayBoxDiv>
          <Line style={{ height: "3.1875rem" }}>
            <DarkGrayText>제목</DarkGrayText>
            <DisplayDataTitleDiv>
              <DisplayDataTitleText>{detailData.title}</DisplayDataTitleText>
            </DisplayDataTitleDiv>
          </Line>
          <Line style={{ marginTop: "0.56rem", height: "7.9375rem" }}>
            <DarkGrayText>사유</DarkGrayText>
            <DisplayDataReasonDiv>
              <DisplayDataReasonText>
                {detailData.situation}
              </DisplayDataReasonText>
            </DisplayDataReasonDiv>
          </Line>
          <Line style={{ marginTop: "3.19rem" }}>
            <DarkGrayText style={{ height: "2.4375rem" }}>
              필요 금액
            </DarkGrayText>
            <DisplayDataTotalDiv>
              <DisplayDataTotalText>{formattedNumber2} 원</DisplayDataTotalText>
            </DisplayDataTotalDiv>
          </Line>
          <Line style={{ marginTop: "0.56rem", height: "2.4375rem" }}>
            <DarkGrayText>갚을 날짜</DarkGrayText>
            <DisplayDataTotalDiv>
              <DisplayDataTotalText>{formatted_date} </DisplayDataTotalText>
            </DisplayDataTotalDiv>
          </Line>
          <Line style={{ marginTop: "0.56rem" }}>
            <DarkGrayText style={{ height: "2.4375rem" }}>
              받을 계좌
            </DarkGrayText>
            <DisplayDataTotalDiv style={{ width: "13rem" }}>
              <DisplayDataTotalText>{detailData.bank}</DisplayDataTotalText>
            </DisplayDataTotalDiv>
            <DisplayDataTotalDiv style={{ width: "23.1875rem" }}>
              <DisplayDataTotalText>
                {detailData.bankAccount}
              </DisplayDataTotalText>
            </DisplayDataTotalDiv>
          </Line>
          <SignDiv>
            <SignText>서약</SignText>
            <SignText>
              나 {detailData.name}(은)는 {formatted_date}까지 돈을 갚을 것을
              약속합니다. 감사합니다.
            </SignText>
            <img src={CheckBox} alt="체크박스 이미지"></img>
          </SignDiv>
        </DisplayBoxDiv>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 46.1875rem;
  height: 45.3125rem;
  border-radius: 0.625rem;
  background: var(--White_2, #fafafa);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  /* margin-top: 2.6rem; */
`;

const TotalColletMoney = styled.div`
  color: #3e3e3e;

  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-top: 3.06rem;
  padding-left: 1.375rem;
`;

const Image = styled.div`
  position: absolute;
  width: 11.875rem;
  height: 4.4375rem;
  background-image: url(${Talk});
  background-repeat: no-repeat;
  background-size: contain;
  top: 2%;
  left: 40%;
  z-index: 1;
  display: flex;
  //justify-content: center;
  //align-items: center;
`;

const ImageCharacter = styled.div`
  position: absolute;
  width: 6rem;
  height: 6rem;
  background-image: url(${Character});
  background-repeat: no-repeat;
  background-size: contain;
  top: 3%;
  left: 32%;
  z-index: 1;
  display: flex;
  //justify-content: center;
  //align-items: center;
`;

const ImageText = styled.div`
  position: relative;
  color: #5b5b5b;
  display: flex;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 10rem;
  padding-top: 0.55rem;
  left: 10%;
`;

const StyleLineProgress = styled.div`
  //max-width: 43.375rem;
  margin-left: 1.375rem;
  margin-top: 0.75rem;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding-right: 1.625rem;
`;

const Circle = styled.div`
  width: 0.4375rem;
  height: 0.4375rem;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background-color: #fc511c;
`;

const ReceivedMoney = styled.div`
  color: #5b5b5b;
  padding-left: 0.375rem;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const DisplayBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 42.375rem;
  height: 29.1875rem;
  //border: 0.0625rem solid red;
  margin-right: 1.44rem;
  margin-left: 2.375rem;
  margin-top: 1.62rem;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const DarkGrayText = styled.div`
  display: flex;
  color: #6a6a6a;

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4375rem;
  //margin-right: 2.9375rem;
`;

const DisplayDataDiv = styled.div`
  display: flex;
  width: 37.5625rem;
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.0625rem solid #e0e0e0;
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
  height: 3.1875rem;
`;

const DisplayDataTitleText = styled(DisplayDataText)`
  display: flex;
  //margin: 0.31rem 2.25rem 0.31rem 1.3125rem;
  //margin: 0rem 2.25rem 0rem 1.3125rem;
  width: 100%;
`;

const DisplayDataReasonDiv = styled(DisplayDataDiv)`
  height: 7.9375rem;
`;

const DisplayDataReasonText = styled(DisplayDataText)`
  color: #696666;
  font-weight: 500;
  //height: 100%;
  width: 100%;
`;

const DisplayDataPlanDiv = styled(DisplayDataDiv)`
  height: 5.3125rem;
  //overflow-y: auto;
`;

const DisplayDataPlanText = styled(DisplayDataText)`
  //height: 100%;
  color: #696969;
  font-weight: 500;
  width: 100%;
`;

const DisplayDataTotalDiv = styled(DisplayDataDiv)`
  height: 2.4375rem;
  justify-content: end;
  align-items: center;
`;
const DisplayDataTotalText = styled.div`
  color: #696969;
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
  //padding-left: 4rem;
  padding-top: 2.19rem;
  align-items: center;
`;

const SignText = styled.div`
  display: flex;
  color: #a5a5a5;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 243.75% */
`;

export default LeftSide;

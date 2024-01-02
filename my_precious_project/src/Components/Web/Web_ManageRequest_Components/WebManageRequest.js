import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import Header from "../Layout_Components/Mypage_header.js";
import ManageSummary from "./ManageSummary.js";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
//npm install --save react-copy-to-clipboard
import Back from "../../../Assets/img/Back.svg";
import Copy from "../../../Assets/img/Copy.svg";
import Show from "../../../Assets/img/Show.svg";
import ManageBottom from "./ManageBottom.js";
import axios from "axios";
import ShowMyboard from "./ShowMyboard.js";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  background: #f1f1f1;
  overflow: hidden;
`;

const ContentsDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* padding-top: 3.96rem; */
  margin-top: 8.56rem;
`;

const TitleDiv = styled.div`
  display: flex;
  color: #3e3e3e;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const LinkCopyDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 51.875rem;
  justify-content: end;
  padding-bottom: 1.06rem;
  position: relative;
`;

const CopyText = styled.div`
  display: flex;
  color: #6d6d6d;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  margin-right: 2rem;
  padding-left: 0.5rem;
  align-items: center;
  cursor: pointer;
`;

const BackBtn = styled.button`
  position: absolute;
  background-image: url(${Back});
  background-repeat: no-repeat;
  background-size: contain;
  top: -90%;
  left: -6%;
  z-index: 1;
  display: flex;
  width: 1rem;
  height: 2.375rem;
  flex-shrink: 0;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;
`;

function WebManageRequest() {
  let boardId = useParams();
  boardId = boardId.board_id;
  const theme = useTheme();
  const navigate = useNavigate();

  const [manageData, setManageData] = useState({
    title: "",
    borrowMoney: 0,
    payDate: "",
    situation: "",
    payWay: "",
    bank: "",
    bankAccount: "",
    boardStatus: "",
    name: "",
    debts: "",
    dday: 0,
    lendMoneyCount: 0, // 빌린 친구 수
    totalLendmoney: 0, //빌린 돈 총합
    formatted_date: "", //형식이 맞춰진 지불날짜
  });
  console.log(boardId);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/boards/${boardId}`
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

      setManageData(transformedBorrowData);
      console.log(transformedBorrowData);

      //빌려준 친구 수 가져옴
      const lendMoneyCount = parseFloat(transformedBorrowData.debts.length);

      // 빌린돈 더하기
      const maplend = transformedBorrowData.debts.map((value, index) => {
        return parseFloat(value.lendMoney);
      });
      const totalLendmoney = maplend.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      //날짜처리
      const formatted_date =
        transformedBorrowData.payDate.substring(0, 4) +
        "년 " +
        transformedBorrowData.payDate.substring(4, 6) +
        "월 " +
        transformedBorrowData.payDate.substring(6) +
        "일";

      //숫자처리
      const ChangeBorrowMoney = parseFloat(transformedBorrowData.borrowMoney);
    } catch (error) {
      console.error("API에서 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const HandleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header backcolor={"#F1F1F1"} />
        <ContentsDiv>
          <TitleDiv>{manageData.title}</TitleDiv>
          <LinkCopyDiv>
            <BackBtn onClick={HandleBackClick} />
            <img src={Copy} alt="클립보드 아이콘" />
            <CopyToClipboard
              text="링크 만들어줘요잉"
              onCopy={() => alert("클립보드에 복사되었습니다.")}
            >
              <CopyText>링크복사</CopyText>
            </CopyToClipboard>
            <ShowMyboard manageData={manageData} />
          </LinkCopyDiv>
          <ManageSummary
            manageData={manageData}
            setManageData={setManageData}
            boardId={boardId}
          />
          <ManageBottom boardId={boardId} manageData={manageData} />
        </ContentsDiv>
      </Container>
    </ThemeProvider>
  );
}

export default WebManageRequest;

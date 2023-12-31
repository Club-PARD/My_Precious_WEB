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
  width: 54.625rem;
  justify-content: end;
  padding-bottom: 1.25rem;
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
    payWay: "",
    situation: "",
    bank: "",
    bankAccount: "",
    boardStatus: "",
    name: "",
    debts: "",
    dday: 0,
    lendMoneyCount: 0,
    totalLendmoney: 0,
    formattedDate: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://moneyglove.site:8080/api/v23/boards/${boardId}`
      );
      const borrowData = response.data.data;
      let transformedBorrowData = {
        title: borrowData.title,
        borrowMoney: borrowData.borrowMoney,
        payDate: borrowData.payDate,
        payWay: borrowData.payWay,
        situation: borrowData.situation,
        bank: borrowData.bank,
        bankAccount: borrowData.bankAccount,
        boardStatus: borrowData.boardStatus,
        name: borrowData.user.name,
        debts: borrowData.debts.map((dept) => ({
          lendMoney: dept.lendMoney,
        })),
        dday: borrowData.dday,
      };

      setManageData((prevManageData) => ({
        ...prevManageData,
        title: transformedBorrowData.title,
        borrowMoney: transformedBorrowData.borrowMoney,
        payDate: transformedBorrowData.payDate,
        situation: transformedBorrowData.situation,
        bank: transformedBorrowData.bank,
        bankAccount: transformedBorrowData.bankAccount,
        boardStatus: transformedBorrowData.boardStatus,
        name: transformedBorrowData.name,
        debts: transformedBorrowData.debts,
        dday: transformedBorrowData.dday,
      }));
      console.log(transformedBorrowData);
      console.log(manageData);

      //빌려준 친구 수 가져옴
      const lendMoneyCount = parseFloat(transformedBorrowData.debts.length);

      // 빌린돈 더하기
      const maplend = transformedBorrowData.debts.map((value, index) => {
        return parseFloat(value.lendMoney);
      });
      const total_Lendmoney = maplend.reduce((accumulator, currentValue) => {
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

      setManageData((prevManageData) => ({
        ...prevManageData,
        lendMoneyCount: lendMoneyCount,
        totalLendmoney: total_Lendmoney,
        formattedDate: formatted_date,
      }));

      console.log(manageData);

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
              text={`https://precious-relationship.web.app/request-detail/${boardId}`}
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

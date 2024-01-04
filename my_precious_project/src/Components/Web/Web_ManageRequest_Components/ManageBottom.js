import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import DisplayFriend from "./DisplayFriend.js";
import SummaryFriend from "./SummaryFriend.js";
import axios from "axios";
import ManageFriendList from "./ManageFriendList.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 54.625rem;
  padding-top: 3.31rem;
  gap:0.2rem;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const DisplayFriends = styled.div`
  display: flex;
  color: #3e3e3e;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 1.19rem;
`;

const FriendsCountDiv = styled.div`
  display: flex;
  color: #8f8f8f;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-items: end;
  padding-bottom: 0.87rem;
`;

const FriendsCountText = styled.div`
  display: flex;
  color: #ff3d00;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const LeftNoDiv = styled.div`
  display: flex;
  width: 31.1875rem;
  height: 19.9375rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #FAFAFA;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  color: var(--grey-Grey_3, #b3b3b3);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 216.667% */
  justify-content: center;
  align-items: center;
`;

const RightNoDiv = styled.div`
  display: flex;
  width: 19.625rem;
  height: 19.9375rem;
  border-radius: 0.625rem;
  background: #FAFAFA;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  color: var(--grey-Grey_3, #b3b3b3);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 216.667% */
  justify-content: center;
  align-items: center;
`;

function ManageBottom({ boardId, manageData }) {
  const theme = useTheme();
  const [getdebtidShow, setGetdebtidShow] = useState("");
  const [debtidData, setDebtidData] = useState([]);
  const [debtLength, setDebtLength] = useState(0);
  const [debtId, setDebtId] = useState();

  const [displayData, setDisplayData] = useState({
    id: "",
    lendMoney: "",
    message: "",
    bank: "",
    bankAccount: "",
    debtStatus: "",
    repaymentStatus: "",
    name: "",
    gmailId: "", 
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://13.209.230.190/api/v23/debts/boards/${boardId}`
      );
      const borrowData = response.data.data;
      if (borrowData) {
        const transformedBorrowData = borrowData.map((item) => {
          return {
            id: item.id,
            lendMoney: item.lendMoney,
            message: item.message,
            bank: item.bank,
            bankAccount: item.bankAccount,
            debtStatus: item.debtStatus,
            repaymentStatus: item.repaymentStatus,
            name: item.user.name,
            gmailId: item.user.gmailId,
          };
        });

        setDebtLength(borrowData.length);
        setDebtidData(transformedBorrowData);
      } else {
        console.error(
          "API에서 받을 돈 데이터를 가져오는데 실패했습니다: 데이터가 존재하지 않습니다."
        );
      }
    } catch (error) {
      console.error("API에서 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDisplayData = (debtid) => {
    // setGetdebtidShow(debtid);
    if (debtidData.length > 0) {
      setDisplayData(debtidData.find((item) => item.id === debtid));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ColumnDiv style={{ width: "20.225rem", marginRight: "2.88rem" }}>
          <DisplayFriends>도와준 친구들</DisplayFriends>
          <FriendsCountDiv>
            <FriendsCountText>{debtLength}명</FriendsCountText>의 친구들이
            도와주고 있어요
          </FriendsCountDiv>
          {debtLength === 0 ? (
            <RightNoDiv>아직 내역이 없어요.</RightNoDiv>
          ) : (
            <ManageFriendList
              boardId={boardId}
              handleDisplayData={handleDisplayData}
            />
          )}
        </ColumnDiv>
        <ColumnDiv style={{ width: "31.1875rem" }}>
          {debtLength === 0 ? (
            <LeftNoDiv>아직 내역이 없어요.</LeftNoDiv>
          ) : (
            <DisplayFriend displayData={displayData} debtId={debtidData} />
          )}
        </ColumnDiv>
      </Container>
    </ThemeProvider>
  );
}

export default ManageBottom;
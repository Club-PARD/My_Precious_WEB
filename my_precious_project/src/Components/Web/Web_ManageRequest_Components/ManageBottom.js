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
  width: 51.875rem;
  padding-top: 3.31rem;
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
  background: #f0f0f0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
  background: #f0f0f0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
  const [debtLength, setDebtLength] = useState(0);
  const debtId = parseFloat(getdebtidShow);

  const [displayData, setDisplayData] = useState({
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
        `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/debts/${debtId}`
      );
      const borrowData = response.data.data;
      let transformedBorrowData = {
        lendMoney: borrowData.lendMoney,
        message: borrowData.message,
        bank: borrowData.bank,
        bankAccount: borrowData.bankAccount,
        debtStatus: borrowData.debtStatus,
        repaymentStatus: borrowData.repaymentStatus,
        name: borrowData.board.user.name,
        gmailId: borrowData.board.user.gmailId,
      };

      setDebtLength(borrowData.debts.length);

      setGetdebtidShow(transformedBorrowData);
      console.log(transformedBorrowData);
    } catch (error) {
      console.error("API에서 데이터를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ColumnDiv style={{ width: "31.1875rem", marginRight: "0.75rem" }}>
          <DisplayFriends>도와준 친구들</DisplayFriends>
          {debtLength === 0 ? (
            <LeftNoDiv>아직 내역이 없어요.</LeftNoDiv>
          ) : (
            <DisplayFriend displayData={displayData} debtId={debtId} />
          )}
        </ColumnDiv>
        <ColumnDiv style={{ width: "20.225rem" }}>
          <FriendsCountDiv>
            <FriendsCountText>{debtLength}명</FriendsCountText>의 친구들이
            도와주고 있어요
          </FriendsCountDiv>

          {debtLength === 0 ? (
            <RightNoDiv>아직 내역이 없어요.</RightNoDiv>
          ) : (
            <ManageFriendList
              boardId={boardId}
              setGetdebtidShow={setGetdebtidShow}
            />
          )}
        </ColumnDiv>
      </Container>
    </ThemeProvider>
  );
}

export default ManageBottom;

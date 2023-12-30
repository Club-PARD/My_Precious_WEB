import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import DetailsBorrowMoney from "./DetailsBorrowMoney.js";
import DetailsReceiveMoney from "./DetailsReceiveMoney.js";
import ButtonMenu from "./ButtonMenu.js";
import { useNavigate } from "react-router-dom";

//밑에

const DashboardList = ({ BorrowDataSet, ReceiveDataSet, rightCard }) => {
  const theme = useTheme();
  const [selectedMenu, setSelectedMenu] = useState(0); // 초기값은 전체
  const navigate = useNavigate();

  const navigateToRequest = () => {
    navigate("/request");
  };

  // 메뉴가 변경되었을 때 실행되는 콜백
  const handleMenuChange = (newMargin) => {
    setSelectedMenu(newMargin);
  };

  // selectedMenu에 따라서 필터링된 데이터 반환
  const getFilteredData = (selectedMenu) => {
    const currentDate = new Date();
    let percentage;
    let dataSet;

    if (rightCard === "on") {
      percentage = (data) => {
        const totalLendMoney =
          data.debts?.reduce((acc, debt) => acc + Number(debt.lendMoney), 0) ??
          0;
        const borrowMoney = data.board?.borrowMoney ?? 0;
        return (totalLendMoney / borrowMoney) * 100;
      };
      dataSet = ReceiveDataSet;
    } else {
      percentage = (data) => {
        const totalLendMoney =
          data.debts?.reduce((acc, debt) => acc + Number(debt.lendMoney), 0) ??
          0;
        const borrowMoney = data.borrowMoney ?? 0;
        return (totalLendMoney / borrowMoney) * 100;
      };
      dataSet = BorrowDataSet;
    }
    if (selectedMenu === 25) {
      // 진행 중
      return dataSet.filter((data) => {
        const payDate =
          rightCard === "on"
            ? data.board.payDate.toString()
            : data.payDate.toString();
        const setYear = parseInt(payDate.slice(0, 4));
        const setMonth = parseInt(payDate.slice(4, 6));
        const setDay = parseInt(payDate.slice(6, 8));
        const setDateTime = new Date(setYear, setMonth - 1, setDay);
        const differenceTime = setDateTime - currentDate;
        const differenceDays = Math.ceil(
          differenceTime / (1000 * 60 * 60 * 24)
        );
        return differenceDays > 0 && percentage(data) < 100;
      });
    } else if (selectedMenu === 50) {
      // 연체 중
      return dataSet.filter((data) => {
        const payDate =
          rightCard === "on"
            ? data.board.payDate.toString()
            : data.payDate.toString();
        const setYear = parseInt(payDate.slice(0, 4));
        const setMonth = parseInt(payDate.slice(4, 6));
        const setDay = parseInt(payDate.slice(6, 8));
        const setDateTime = new Date(setYear, setMonth - 1, setDay);
        const differenceTime = setDateTime - currentDate;
        const differenceDays = Math.ceil(
          differenceTime / (1000 * 60 * 60 * 24)
        );
        return differenceDays <= 0 && percentage(data) < 100;
      });
    } else if (selectedMenu === 75) {
      // 완료
      return dataSet.filter((data) => percentage(data) >= 100);
    } else {
      // 전체
      return dataSet;
    }
  };

  // 각 메뉴에 대한 데이터 수를 계산하는 함수
  const getMenuDataCounts = () => {
    let dataSet;
    if (rightCard === "on") {
      dataSet = ReceiveDataSet;
    } else {
      dataSet = BorrowDataSet;
    }

    // 이 부분은 실제 데이터 수를 계산하는 로직에 맞게 수정해야 합니다.
    const allCount = dataSet.length;
    const inProgressCount = getFilteredData(25).length;
    const overdueCount = getFilteredData(50).length;
    const doneCount = getFilteredData(75).length;

    return [allCount, inProgressCount, overdueCount, doneCount];
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonMenu
        handleMenuChange={handleMenuChange}
        dataCounts={getMenuDataCounts()}
      />
      <InnerRow1>
        <ListTitle>
          {rightCard === "on"
            ? "최근 빌려준 거래 전체 목록"
            : "최근 빌린 거래 전체 목록"}
        </ListTitle>
        <AddButtonDiv>
          <TransactionAddButton onClick={navigateToRequest}>
            + 새 거래 추가하기
          </TransactionAddButton>
        </AddButtonDiv>
      </InnerRow1>
      <TransactionComponent>
        {rightCard === "on" ? (
          <DetailsReceiveMoney ReceiveDataSet={getFilteredData(selectedMenu)} />
        ) : (
          <DetailsBorrowMoney BorrowDataSet={getFilteredData(selectedMenu)} />
        )}
      </TransactionComponent>
    </ThemeProvider>
  );
};

const TransactionComponent = styled.div`
  margin-top: 50px;
  height: 100%;
`;

const InnerRow1 = styled.div`
  width: 100%;
  display: flex;
  height: 32px;
  margin-top: 50px;
`;

const ListTitle = styled.div`
  width: 50%;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #5b5b5b;
`;

const AddButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: right;
`;

const TransactionAddButton = styled.button`
  width: 141px;
  height: 32px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #ff3d00;
  color: #ff3d00;
  font-size: 14px;
  font-weight: 700;
  background-color: white;
  cursor: pointer;
`;

export default DashboardList;

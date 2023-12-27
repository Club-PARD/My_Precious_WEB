import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DetailsBorrowMoney from './DetailsBorrowMoney.js';
import DetailsReceiveMoney from './DetailsReceiveMoney.js';
import ButtonMenu from './ButtonMenu.js';

//밑에

const DashboardList = ({ BorrowDataSet, ReceiveDataSet, rightCard }) => {
    const theme = useTheme();
    const [selectedMenu, setSelectedMenu] = useState(0); // 초기값은 전체

    // 메뉴가 변경되었을 때 실행되는 콜백
    const handleMenuChange = (newMargin) => {
        setSelectedMenu(newMargin);
    };

    // selectedMenu에 따라서 필터링된 데이터 반환
    const getFilteredData = () => {
        const currentDate = new Date(); // 현재 날짜를 가져옴
        let percentage;
        let dataSet;

        if (rightCard === 'on') {
            percentage = (data) => (data.payBack / data.receiveMoney) * 100;
            dataSet = ReceiveDataSet;
        } else {
            percentage = (data) => (data.payBack / data.borrowMoney) * 100;
            dataSet = BorrowDataSet;
        }

        if (selectedMenu === 25) {
            // 진행 중
            return dataSet.filter((data) => {
                const setDateTime = new Date(data.setYear, data.setMonth - 1, data.setDay);
                const differenceTime = setDateTime - currentDate;
                const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

                // TODO: 조건에 따라 필터링
                return differenceDays > 0 && percentage(data) < 100;
            });
        } else if (selectedMenu === 50) {
            // 연체 중
            return dataSet.filter((data) => {
                const setDateTime = new Date(data.setYear, data.setMonth - 1, data.setDay);
                const differenceTime = setDateTime - currentDate;
                const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

                // TODO: 조건에 따라 필터링
                return differenceDays <= 0 && percentage(data) < 100;
            });
        } else if (selectedMenu === 75) {
            // 완료
            return dataSet.filter((data) => {
                // TODO: 조건에 따라 필터링
                return percentage(data) >= 100;
            });
        } else {
            // 전체
            return dataSet;
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <ButtonMenu handleMenuChange={handleMenuChange} />
            <InnerRow1>
                <ListTitle>최근 빌린 거래 전체 목록</ListTitle>
                <AddButtonDiv>
                    <TransactionAddButton>+ 새 거래 추가하기</TransactionAddButton>
                </AddButtonDiv>
            </InnerRow1>
            {rightCard === 'on' ? (
                <DetailsReceiveMoney ReceiveDataSet={getFilteredData()} />
            ) : (
                <DetailsBorrowMoney BorrowDataSet={getFilteredData()} />
            )}
        </ThemeProvider>
    );
};

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

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DetailsTransaction from './DetailsTransaction.js';
import List from './ButtonMenu.js';

//밑에
const dataSet = [
    {
        title: '엄마가 많이 아파요...',
        borrowMoney: '1000000',
        payBack: '5000',
        payYear: 2025,
        payMonth: 3,
        payDay: 31,
        setYear: 2026,
        setMonth: 3,
        setDay: 31,
        situation: '엄마가 블라블라 병원에 블라블라 수술을 블라블라',
        payWay: '계좌이체로 꼭 드릴게요..!!',
        bank: '국민은행',
        bankAccount: '164502-04-123456',
        status: false,
    },
    {
        title: '당장 내야하는 월세가 부족해요....',
        borrowMoney: '350000',
        payBack: '400000',
        payYear: 2024,
        payMonth: 12,
        payDay: 25,
        setYear: 2025,
        setMonth: 3,
        setDay: 31,
        situation: '월세를 내야하는데 돈이 부족해요.. 3달째 못내고 있는데.. 도와주실 수 있나요?',
        payWay: '계좌이체로 꼭 드리겠습니다.. 도와주세요',
        bank: '기업은행',
        bankAccount: '158-124212-11-123',
        status: true,
    },
    {
        title: '동생 생일선물을 사주고 싶어요..',
        borrowMoney: '100000',
        payBack: '70000',
        payYear: 2024,
        payMonth: 12,
        payDay: 25,
        setYear: 2024,
        setMonth: 12,
        setDay: 1,
        situation: '월세를 내야하는데 돈이 부족해요.. 3달째 못내고 있는데.. 도와주실 수 있나요?',
        payWay: '계좌이체로 꼭 드리겠습니다.. 도와주세요',
        bank: '기업은행',
        bankAccount: '158-124212-11-123',
        status: false,
    },
];

const DashboardList = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <List />
            <InnerRow1>
                <ListTitle>최근 빌린 거래 전체 목록</ListTitle>
                <AddButtonDiv>
                    <TransactionAddButton>+ 새 거래 추가하기</TransactionAddButton>
                </AddButtonDiv>
            </InnerRow1>
            <DetailsTransaction dataSet={dataSet} />
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

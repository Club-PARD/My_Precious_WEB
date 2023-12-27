import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import HistoryCard from './HistoryCard.js';
import DashboardList from './DashboardList.js';

//전체페이지
const dataSet = [
    {
        title: '엄마가 많이 아파요...',
        borrowMoney: '1000000',
        payBack: '5000',
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
        setYear: 2023,
        setMonth: 10,
        setDay: 1,
        situation: '월세를 내야하는데 돈이 부족해요.. 3달째 못내고 있는데.. 도와주실 수 있나요?',
        payWay: '계좌이체로 꼭 드리겠습니다.. 도와주세요',
        bank: '기업은행',
        bankAccount: '158-124212-11-123',
        status: false,
    },
];

const WebDashboard = () => {
    const theme = useTheme();

    //거래 내역 카드의 상태를 관리한다(왼쪽: 빌린돈/ 오른쪽: 받을돈)
    const [leftCard, setLeftCard] = useState('on');
    const [rightCard, setRightCard] = useState('off');

    // dataSet에 따른 카드 정보를 계산하는 함수
    const LeftCalculateCardInfo = (dataSet) => {
        const CardCount = dataSet.length;
        const CardTotal = dataSet.reduce((acc, data) => acc + Number(data.borrowMoney), 0);

        let minNegativeDDay = Number.MAX_SAFE_INTEGER;
        let maxPositiveDDay = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < dataSet.length; i++) {
            const setDateTime = new Date(dataSet[i].setYear, dataSet[i].setMonth - 1, dataSet[i].setDay);
            const payDateTime = new Date();
            const differenceTime = payDateTime - setDateTime;
            const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

            if (differenceDays < 0) {
                minNegativeDDay = Math.min(minNegativeDDay, differenceDays);
            } else {
                maxPositiveDDay = Math.max(maxPositiveDDay, differenceDays);
            }
        }

        const CardDate = minNegativeDDay !== Number.MAX_SAFE_INTEGER ? `D+${maxPositiveDDay}` : `D${minNegativeDDay}`;

        return {
            CardCount,
            CardTotal,
            CardDate,
        };
    };

    //왼쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [leftCardInfo, setLeftCardInfo] = useState(LeftCalculateCardInfo(dataSet));

    //오른쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [rightCardInfo, setRightCardInfo] = useState({
        CardCount: 2,
        CardTotal: '200,000,000',
        CardDate: 'D-2',
    });

    //거래 내역 왼쪽(빌린 돈) 클릭시
    const handleLeftCardClick = () => {
        setLeftCard('on');
        setRightCard('off');
    };
    //거래 내역 오른쪽(갚을 돈) 클릭시
    const handleRightCardClick = () => {
        setLeftCard('off');
        setRightCard('on');
        console.log(leftCard, rightCard);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header />
                <ContentsDiv>
                    <NameGreeting>현지님 안녕하세요!</NameGreeting>
                    <MyHistory>내 거래 내역</MyHistory>
                    <CardDiv>
                        <HistoryCard
                            state={leftCard}
                            position={'left'}
                            cardInfo={leftCardInfo}
                            onClick={handleLeftCardClick}
                        />
                        <HistoryCard
                            state={rightCard}
                            position={'right'}
                            cardInfo={rightCardInfo}
                            onClick={handleRightCardClick}
                        />
                    </CardDiv>
                    <DashboardList dataSet={dataSet} rightCard={rightCard} />
                </ContentsDiv>
            </Container>
        </ThemeProvider>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    align-items: center;
    background: #fafafa;
`;

const ContentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 726px;
    //border: 1px solid green; // 위치 확인용 보더
`;

const NameGreeting = styled.div`
    color: #3e3e3e;
    margin-top: 61px;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const MyHistory = styled.div`
    color: #3e3e3e;
    margin-left: 4px;
    margin-top: 25px;

    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const CardDiv = styled.div`
    display: flex;
    padding: 0;
    margin-left: 5px;
    margin-top: 13px;
    justify-content: space-between;
`;

export default WebDashboard;

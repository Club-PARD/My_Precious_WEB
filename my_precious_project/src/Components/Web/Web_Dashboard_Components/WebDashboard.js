import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import HistoryCard from './HistoryCard.js';
import DashboardList from './DashboardList.js';

//전체페이지

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
    margin-top: 56px;
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

const WebDashboard = () => {
    const theme = useTheme();

    //거래 내역 카드의 상태를 관리한다(왼쪽: 빌린돈/ 오른쪽: 받을돈)
    const [leftCard, setLeftCard] = useState('on');
    const [rightCard, setRightCard] = useState('off');

    //왼쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [leftCardInfo, setLeftCardInfo] = useState({
        CardCount: 1,
        CardTotal: '100,000,000',
        // 디데이 "D-0" 일단 이런식으로 해둠 +/- 처리 잘 모르겠음
        CardDate: 'D-0',
    });

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
                    <DashboardList />
                </ContentsDiv>
            </Container>
        </ThemeProvider>
    );
};

export default WebDashboard;

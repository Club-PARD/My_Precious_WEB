import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import HistoryCard from './HistoryCard.js';
import DashboardList from './DashboardList.js';
import { UserDataContext } from '../../../contexts/userContext';
import axios from 'axios';

//전체페이지
const ReceiveDataSet = [
    {
        author: '김채린',
        title: '친구 월세 빌려줌',
        receiveMoney: '450000',
        payBack: '150000',
        setDate: '20240101',
        situation: '친구가 월세돈이 없다.',
        payWay: '계좌이체로 준다 했음',
        bank: '국민은행',
        bankAccount: '164502-04-123456',
    },
    {
        author: '김현지',
        title: '교수님 노트북 비용 빌려줌',
        receiveMoney: '2800000',
        payBack: '100000',
        setDate: '20231229',
        situation: '교수님이랑 같이 매장갔는데 돈이 없다해서 빌려줌',
        payWay: '현금으로 준다고 함',
        bank: '기업은행',
        bankAccount: '158-124212-11-123',
    },
    {
        author: '장동원',
        title: '남자친구 케이크값 빌려줌',
        receiveMoney: '200000',
        payBack: '200000',
        setDate: '20241001',
        situation: '남자친구 지갑 잃어버림',
        payWay: '카페로 받을거임',
        bank: '기업은행',
        bankAccount: '158-124212-11-123',
    },
];

const WebDashboard = () => {
    const theme = useTheme();
    const [BorrowDataSet, setBorrowDataSet] = useState([]);
    const [userData, setUserData] = useContext(UserDataContext);
    const uid = userData.uid;
    const restOfName = userData && userData.name ? userData.name.slice(1) : '';
    console.log(userData);

    // 페이지가 로드되었을 때 로컬 스토리지에 userData 저장
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, []);

    // API에서 데이터 가져오기
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/boards/users//${uid}`);
            setBorrowDataSet(response.data.data);
            console.log(response);
        } catch (error) {
            console.error('API에서 데이터를 가져오는데 실패했습니다:', error);
        }
    };

    // 컴포넌트가 마운트될 때 API에서 데이터를 가져옴
    useEffect(() => {
        fetchData();
    }, []);

    //거래 내역 카드의 상태를 관리한다(왼쪽: 빌린돈/ 오른쪽: 받을돈)
    const [leftCard, setLeftCard] = useState('on');
    const [rightCard, setRightCard] = useState('off');

    // dataSet에 따른 카드 정보를 계산하는 함수
    const LeftCalculateCardInfo = (BorrowDataSet) => {
        const filteredDataSet = BorrowDataSet.filter((data) => (data.payBack / data.borrowMoney) * 100 < 100);
        const CardCount = filteredDataSet.length;
        const CardTotal = filteredDataSet.reduce((acc, data) => acc + Number(data.borrowMoney), 0);

        let minNegativeDDay = Number.MAX_SAFE_INTEGER;
        let maxPositiveDDay = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < filteredDataSet.length; i++) {
            const setDate = filteredDataSet[i].setDate.toString();
            const setYear = parseInt(setDate.slice(0, 4));
            const setMonth = parseInt(setDate.slice(4, 6));
            const setDay = parseInt(setDate.slice(6, 8));

            const setDateTime = new Date(setYear, setMonth - 1, setDay);

            const payDateTime = new Date();
            const differenceTime = payDateTime - setDateTime;
            const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

            if (differenceDays < 0) {
                minNegativeDDay = Math.min(minNegativeDDay, differenceDays);
            } else {
                maxPositiveDDay = Math.max(maxPositiveDDay, differenceDays);
            }
        }

        const CardDate =
            minNegativeDDay !== Number.MAX_SAFE_INTEGER
                ? maxPositiveDDay > 0
                    ? `D+${maxPositiveDDay}`
                    : maxPositiveDDay === 0
                    ? 'D-Day'
                    : `D${maxPositiveDDay}`
                : minNegativeDDay === 0
                ? 'D-Day'
                : `D${minNegativeDDay}`;

        return {
            CardCount,
            CardTotal,
            CardDate,
        };
    };

    const RightCalculateCardInfo = (ReceiveDataSet) => {
        const filteredDataSet = ReceiveDataSet.filter((data) => (data.payBack / data.receiveMoney) * 100 < 100);
        const CardCount = filteredDataSet.length;
        const CardTotal = filteredDataSet.reduce((acc, data) => acc + Number(data.receiveMoney), 0);

        let minNegativeDDay = Number.MAX_SAFE_INTEGER;
        let maxPositiveDDay = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < filteredDataSet.length; i++) {
            const setDate = filteredDataSet[i].setDate.toString();
            const setYear = parseInt(setDate.slice(0, 4));
            const setMonth = parseInt(setDate.slice(4, 6));
            const setDay = parseInt(setDate.slice(6, 8));

            const setDateTime = new Date(setYear, setMonth - 1, setDay);
            const payDateTime = new Date();
            const differenceTime = payDateTime - setDateTime;
            const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

            if (differenceDays < 0) {
                minNegativeDDay = Math.min(minNegativeDDay, differenceDays);
            } else {
                maxPositiveDDay = Math.max(maxPositiveDDay, differenceDays);
            }
        }

        const CardDate =
            minNegativeDDay !== Number.MAX_SAFE_INTEGER
                ? maxPositiveDDay > 0
                    ? `D+${maxPositiveDDay}`
                    : maxPositiveDDay === 0
                    ? 'D-Day'
                    : `D${maxPositiveDDay}`
                : minNegativeDDay === 0
                ? 'D-Day'
                : `D${minNegativeDDay}`;

        return {
            CardCount,
            CardTotal,
            CardDate,
        };
    };

    //왼쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [leftCardInfo, setLeftCardInfo] = useState(LeftCalculateCardInfo(BorrowDataSet));

    //오른쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [rightCardInfo, setRightCardInfo] = useState(RightCalculateCardInfo(ReceiveDataSet));

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
                    <NameGreeting>{restOfName}님 안녕하세요!</NameGreeting>
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
                    <DashboardList
                        BorrowDataSet={BorrowDataSet}
                        ReceiveDataSet={ReceiveDataSet}
                        rightCard={rightCard}
                    />
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
    height: 100vh;
    overflow-y: hidden;
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

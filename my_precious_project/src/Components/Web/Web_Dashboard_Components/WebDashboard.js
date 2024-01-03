import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import HistoryCard from './HistoryCard.js';
import DashboardList from './DashboardList.js';
import { useUserData } from '../../../contexts/userContext';
import axios from 'axios';

//전체페이지
const WebDashboard = () => {
    const theme = useTheme();
    const [BorrowDataSet, setBorrowDataSet] = useState([]);
    const [ReceiveDataSet, setReceiveDataSet] = useState([]);
    const [userData, setUserData] = useUserData();
    const uid = userData.uid;
    const restOfName = userData && userData.name ? userData.name.slice(1) : '';
    console.log(userData);

    // 페이지가 로드되었을 때 로컬 스토리지에 userData 저장
    useEffect(() => {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }, []);

    // API에서 데이터 가져오기
    const fetchData = async () => {
        try {
            // 빌린 돈 데이터 가져오기
            const borrowResponse = await axios.get(
                `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/boards/users/${uid}`
            );
            const borrowData = borrowResponse.data.data;
            let transformeddBorrowData = [];

            // 데이터를 BorrowDataSet 형식으로 변환
            const transformedBorrowData = borrowData.map((item) => {
                const debts = item.debts.map((debt) => ({
                    lendMoney: debt.lendMoney,
                }));

                return {
                    id: item.id,
                    title: item.title,
                    borrowMoney: item.borrowMoney,
                    payDate: item.payDate,
                    situation: item.situation,
                    payWay: item.payWay,
                    bank: item.bank,
                    bankAccount: item.bankAccount,
                    user: {
                        name: item.user.name,
                        gmailId: item.user.gmailId,
                        uid: item.user.uid,
                    },
                    debts: debts,
                };
            });

            setBorrowDataSet(transformedBorrowData);
            console.log(transformedBorrowData);

            // 받을 돈 데이터 가져오기
            // 받을 돈 데이터 가져오기
            const receiveResponse = await axios.get(
                `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/debts/users/${uid}`
            );
            const receiveData = receiveResponse.data.data;
            let transformedReceiveData = [];

            if (receiveData) {
                // 데이터를 ReceiveDataSet 형식으로 변환
                const transformedReceiveData = receiveData.map((item) => {
                    const debts =
                        item.board?.debts?.map((debt) => ({
                            lendMoney: debt.lendMoney,
                        })) || [];

                    return {
                        id: item.id,
                        lendMoney: item.lendMoney,
                        message: item.message,
                        bank: item.bank,
                        bankAccount: item.bankAccount,
                        debtStatus: item.debtStatus,
                        repaymentStatus: item.repaymentStatus,
                        board: {
                            title: item.board?.title,
                            borrowMoney: item.board?.borrowMoney,
                            payDate: item.board?.payDate,
                            bank: item.board?.bank,
                            bankAccount: item.board?.bankAccount,
                            user: {
                                name: item.board?.user?.name,
                                gmailId: item.board?.user?.gmailId,
                                uid: item.board?.user?.uid,
                            },
                            debts: debts,
                        },
                    };
                });
                setReceiveDataSet(transformedReceiveData);
                console.log(transformedReceiveData);
            } else {
                console.error('API에서 받을 돈 데이터를 가져오는데 실패했습니다: 데이터가 존재하지 않습니다.');
            }
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
        if (!BorrowDataSet || BorrowDataSet.length === 0) {
            return {
                CardCount: 0,
                CardTotal: 0,
                CardDate: '0',
            };
        }
        const filteredDataSet = BorrowDataSet.filter(
            (data) => (data.debts.reduce((acc, debt) => acc + Number(debt.lendMoney), 0) / data.borrowMoney) * 100 < 100
        );

        const CardCount = filteredDataSet.length;
        const CardTotal = CardCount > 0 ? filteredDataSet.reduce((acc, data) => acc + Number(data.borrowMoney), 0) : 0;

        let maxDifferenceDays = Number.MIN_SAFE_INTEGER;
        let CardDate = '0';

        if (CardCount > 0) {
            for (let i = 0; i < filteredDataSet.length; i++) {
                const payDate = filteredDataSet[i].payDate.toString();
                const setYear = parseInt(payDate.slice(0, 4));
                const setMonth = parseInt(payDate.slice(4, 6));
                const setDay = parseInt(payDate.slice(6, 8));

                const setDateTime = new Date(setYear, setMonth - 1, setDay);
                setDateTime.setDate(setDateTime.getDate() + 1);
                const payDateTime = new Date();
                const differenceTime = payDateTime - setDateTime;
                const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

                maxDifferenceDays = Math.max(maxDifferenceDays, differenceDays);
            }
            CardDate =
                maxDifferenceDays < 0
                    ? `D${maxDifferenceDays}`
                    : maxDifferenceDays === 0
                    ? 'D-Day'
                    : `D+${maxDifferenceDays}`;
        }
        return {
            CardCount,
            CardTotal,
            CardDate,
        };
    };

    const RightCalculateCardInfo = (ReceiveDataSet) => {
        // 초기값 설정
        let CardCount = 0,
            CardTotal = 0,
            CardDate = '0';

        // 데이터가 유효한 경우에만 처리
        if (ReceiveDataSet && ReceiveDataSet.length > 0) {
            const filteredDataSet = ReceiveDataSet.filter(
                (data) => (Number(data.lendMoney) / Number(data.board.borrowMoney)) * 100 < 100
            );

            CardCount = filteredDataSet.length;

            // CardCount가 0보다 큰 경우에만 CardTotal과 CardDate 계산
            if (CardCount > 0) {
                CardTotal = filteredDataSet.reduce((acc, data) => acc + Number(data.lendMoney), 0);

                let maxDifferenceDays = Number.MIN_SAFE_INTEGER;

                for (let i = 0; i < filteredDataSet.length; i++) {
                    const payDate = filteredDataSet[i].board.payDate.toString();
                    const setYear = parseInt(payDate.slice(0, 4));
                    const setMonth = parseInt(payDate.slice(4, 6));
                    const setDay = parseInt(payDate.slice(6, 8));

                    const setDateTime = new Date(setYear, setMonth - 1, setDay);
                    setDateTime.setDate(setDateTime.getDate() + 1);
                    const payDateTime = new Date();

                    const differenceTime = payDateTime - setDateTime;
                    const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

                    maxDifferenceDays = Math.max(maxDifferenceDays, differenceDays);
                }

                CardDate =
                    maxDifferenceDays < 0
                        ? `D${maxDifferenceDays}`
                        : maxDifferenceDays === 0
                        ? 'D-Day'
                        : `D+${maxDifferenceDays}`;
            }
        }

        return {
            CardCount,
            CardTotal,
            CardDate,
        };
    };

    //왼쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [leftCardInfo, setLeftCardInfo] = useState(LeftCalculateCardInfo(BorrowDataSet));
    // useEffect를 사용하여 BorrowDataSet이 변경될 때마다 LeftCalculateCardInfo를 호출
    useEffect(() => {
        setLeftCardInfo(LeftCalculateCardInfo(BorrowDataSet));
    }, [BorrowDataSet]);

    //오른쪽 카드(빌린 돈) props 정리(서버랑 연결 필요)
    const [rightCardInfo, setRightCardInfo] = useState(RightCalculateCardInfo(ReceiveDataSet));
    useEffect(() => {
        setRightCardInfo(RightCalculateCardInfo(ReceiveDataSet));
    }, [ReceiveDataSet]);

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
                <Header backcolor={'#FAFAFA'} />
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
    background-color: #fafafa;
    min-height: 100vh;
`;

const ContentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 726px;
    margin-top: 8.75rem;
    //border: 1px solid green; // 위치 확인용 보더
`;

const NameGreeting = styled.div`
    color: #3e3e3e;
    /* margin-top: 61px; */
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

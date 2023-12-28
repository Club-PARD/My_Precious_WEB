import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js.js';
import CircleProgressbar from './CircleProgressbar.js';

const DetailsBorrowMoney = ({ BorrowDataSet = [] }) => {
    const theme = useTheme();
    const [payDateTime, setPayDateTime] = useState(new Date());

    useEffect(() => {
        setPayDateTime(new Date());
    }, []);

    return (
        <div>
            {BorrowDataSet.map((data, index) => {
                const setDate = data.setDate.toString();
                const setYear = parseInt(setDate.slice(0, 4));
                const setMonth = parseInt(setDate.slice(4, 6));
                const setDay = parseInt(setDate.slice(6, 8));

                const setDateTime = new Date(setYear, setMonth - 1, setDay);
                const payDateTime = new Date();
                const differenceTime = payDateTime - setDateTime;
                const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

                return (
                    <Container key={index}>
                        <StyleCircleProgressbar>
                            <CircleProgressbar totalMoney={data.borrowMoney} debtMoney={data.payBack} index={index} />
                        </StyleCircleProgressbar>
                        <DisplayBorderBottom>
                            <DetialsExplain>
                                <ExplainTextDiv>
                                    <div>빌린 이유</div>
                                    <div>총 빌릴 금액</div>
                                    <div>갚아야 할 약속 날짜</div>
                                </ExplainTextDiv>
                                <UserDateTextDiv>
                                    <ReasonText>{data.title}</ReasonText>
                                    <Row style={{ gap: '8px' }}>
                                        <UserDataText>{data.borrowMoney}</UserDataText>
                                        <GrayText>원</GrayText>
                                    </Row>
                                    <Row style={{ gap: '3px' }}>
                                        <UserDataText>
                                            {`${setYear}.${String(setMonth).padStart(2, '0')}.${String(setDay).padStart(
                                                2,
                                                '0'
                                            )}`}
                                        </UserDataText>
                                        <GrayText>일</GrayText>
                                    </Row>
                                </UserDateTextDiv>
                            </DetialsExplain>
                            <DisplayDday>
                                {differenceDays > 0
                                    ? `D+${differenceDays}`
                                    : differenceDays === 0
                                    ? 'D-Day'
                                    : `D${differenceDays}`}
                            </DisplayDday>
                        </DisplayBorderBottom>
                    </Container>
                );
            })}
        </div>
    );
};

const Container = styled.div`
    margin-bottom: 5rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 120px;
    justify-content: center;
`;

const StyleCircleProgressbar = styled.div`
    width: 23%;
    height: 100%;
`;

const DisplayBorderBottom = styled.div`
    display: flex;
    align-items: end;
    justify-content: start;
    border-bottom: 2px solid #f5f5f5;
    width: 77%;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const DetialsExplain = styled(Row)`
    display: flex;
    //border-bottom: 2px solid #F5F5F5;
    justify-content: space-between;
    width: 350px;
`;

const ExplainTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 16px;
    padding-bottom: 16px;

    color: #707070;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    gap: 11px;
`;

const UserDateTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 11px;
    width: 10rem;
`;

const UserDataText = styled.div`
    display: flex;
    color: #707070;
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ReasonText = styled.div`
    display: flex;
    color: #707070;
    justify-content: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    width: 15rem;
`;

const GrayText = styled.div`
    display: flex;
    color: #9e9e9e;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const DisplayDday = styled.div`
    display: flex;
    width: 61px;
    height: 19px;
    border-radius: 20px;
    background-color: #ff3d00;
    margin-left: 41px;
    margin-bottom: 16px;
    color: #ffefef;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    justify-content: center;
    align-items: end;
`;

export default DetailsBorrowMoney;

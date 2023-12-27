import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import CountUpAnimation from './CountUpAnimation.js';

//윗 부분 총 계산

const HistoryCard = (props) => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <CardContiner state={props.state === 'on'} onClick={props.onClick}>
                <Row>
                    <Transactionlabel>{props.position === 'left' ? '빌린 돈' : '받을 돈'}</Transactionlabel>
                    <TransactionCount>
                        {props.position === 'left' ? props.cardInfo.CardCount : props.cardInfo.CardCount}건
                    </TransactionCount>
                </Row>
                <TotalMoney>
                    <CountUpAnimation
                        end={props.position === 'left' ? props.cardInfo.CardTotal : props.cardInfo.CardTotal}
                        start="0"
                        duration={1000}
                    />
                    원
                </TotalMoney>
                <Dday state={props.state === 'on'}>
                    {props.position === 'left' ? '갚을 날짜까지' : '받을 날짜까지'} {props.cardInfo.CardDate}
                </Dday>
            </CardContiner>
        </ThemeProvider>
    );
};

const CardContiner = styled.button`
    display: flex;
    flex-direction: column;
    width: 351px;
    height: 182px;
    flex-shrink: 0;
    border-radius: 8px;
    background: ${(props) => (props.state ? '#FF3D00' : '#504F4F')};
    border: none;
    padding: 0;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.state === 'on' ? '#504F4F' : '#FF3D00')};

        & > :last-child {
            color: ${(props) => (props.state === 'on' ? '#504F4F' : '#FF3D00')};
        }
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    text-align: left;
`;
const Transactionlabel = styled.div`
    display: flex;
    padding-left: 16px;
    padding-top: 14px;
    color: #fff;
    height: 19px;
    width: 20%;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const TransactionCount = styled.div`
    display: flex;
    color: #faffbe;
    padding-top: 14px;
    width: 80%;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const TotalMoney = styled.div`
    display: flex;
    padding-top: 24px;
    padding-left: 16px;
    color: #fff;
    width: 90%;
    height: 38px;

    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Dday = styled.div`
    display: flex;
    height: 19px;
    flex-shrink: 0;
    margin-top: 39px;
    margin-left: 17px;
    padding: 6px 9px 6px 9px;

    flex-shrink: 0;
    border-radius: 4px;
    background: #f0f0f0;
    align-items: center;

    color: ${(props) => (props.state ? '#FF3D00' : '#504F4F')};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export default HistoryCard;

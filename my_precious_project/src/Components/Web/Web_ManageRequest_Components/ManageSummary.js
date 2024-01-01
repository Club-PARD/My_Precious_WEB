import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js.js'; // Context APi 적용
import SmallLineProgress from './SmallLineProgress.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 44.5rem;
    height: 13.875rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #FBFBFB;
`;

const DisplayMoneyContainer =styled.div`
    display: flex;
    flex-direction: row;
`;

const DisplayMoneyDiv =styled.div`
    display: flex;
    flex-direction: column;
    width: 20rem;
    padding-top: 1.44rem;
`;

const MoneyText =styled.div`
    display: flex;
    color: #3E3E3E;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 0.74rem;
`;

const Row =styled.div`
    display: flex;
    flex-direction: row;
    color: #5B5B5B;
    align-items: center;

    text-align: right;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-top: 0.36rem;
`;

const Circle =styled.div`
    width: 0.4375rem;
    height: 0.4375rem;
    flex-shrink: 0;
    border: none;
    background-color: #FC511C;
    border-radius: 50%; 
    margin-right: 0.25rem;
`;

const RightRowDiv =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #5B5B5B;
    text-align: right;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    align-items: center;
`;

const UnderGrayDiv =styled.div`
    display: flex;
    flex-direction: column;
    padding-top:2.3rem;
    padding-left: 1.56rem;
    gap: 0.37rem;
    justify-content: center;
`;

const UnderGrayFirstDiv =styled.div`
    display: flex;
    flex-direction: row;
    color: #696969;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

`;

const Dday =styled.div`
    display: flex;
    width: 3.625rem;
    height: 1.25rem;
    flex-shrink: 0;
    border-radius: 0.4375rem;
    border: 1px solid #FF3D00;
    color: #FF3D00;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 1.12rem;
`;

function ManageSummary() {
    const theme = useTheme();

    const [detailData, setDetailData] = useState({
        total: 10000, //이만큼 돈 주세요
        receive: 5000, //이만큼 모였어요
        title: "",
        reason: "",
        plan: "",
        date: "",
        bank: "",
        account:"",
        name:"" ,
        lendMoneyCount: 0 , // 빌려준 친구의 수
        
    });

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <DisplayMoneyContainer>
                <DisplayMoneyDiv style={{paddingLeft:"1.56rem"}}>
                    <MoneyText>현재까지 모인 금액</MoneyText>
                    <SmallLineProgress total={parseFloat(detailData.total)} receive={parseFloat(detailData.receive)} />
                    <Row>
                        <Circle/> 30,000
                    </Row>
                </DisplayMoneyDiv>
                <DisplayMoneyDiv style={{paddingLeft:"1.25rem"}}>
                    <MoneyText>갚은 금액</MoneyText>
                    <SmallLineProgress total={parseFloat(detailData.total)} receive={parseFloat(detailData.receive)} />
                    <RightRowDiv>
                        <Row>
                            <Circle/> 0
                        </Row>
                        30,000
                    </RightRowDiv>
                </DisplayMoneyDiv>
                </DisplayMoneyContainer>
                <UnderGrayDiv>
                    <UnderGrayFirstDiv>
                        <div style={{paddingRight:"6.19rem"}}>필요 금액</div>
                        <div>5,000,000 원</div>
                    </UnderGrayFirstDiv>
                    <UnderGrayFirstDiv>
                        <div style={{paddingRight:"2.3rem"}}>갚기로 한 약속날짜</div>
                        <div>2024년 02월 24일</div>
                        <Dday>D-20</Dday>
                    </UnderGrayFirstDiv>
                </UnderGrayDiv>
            </Container>
        </ThemeProvider>
    );
}

export default ManageSummary;

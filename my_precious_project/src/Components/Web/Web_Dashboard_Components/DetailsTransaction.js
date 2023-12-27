import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import CircleProgressbar from './CircleProgressbar.js';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 721px;
    height: 120px;
    background-color: #FAFAFA;
    align-items: center;
`;

const StyleCircleProgressbar = styled.div`
    width: 106.44px;
    height: 106.44px;
    padding-right: 63px;
`;

const DisplayBorderBottom =styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #F5F5F5;
    align-items: end;
    padding-right: 99.56px;
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
    //padding-left: 20px;
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 11px;
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
`
const GrayText =styled.div`
    display: flex;
    color: #9E9E9E;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
const DisplayDday =styled.div`
    display: flex;
    width: 61px;
    height: 19px;
    border-radius: 20px;
    background: #FF3D00;
    margin-left: 41px;
    margin-bottom: 16px;

    color: #FFEFEF;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    //line-height: normal
    justify-content: center;
`;


const DetailsTransaction = () => {
    const theme = useTheme();
    return (
    <Container>
        <StyleCircleProgressbar>
          <CircleProgressbar totalMoney={10000} debtMoney={12000}/>
        </StyleCircleProgressbar>
        <DisplayBorderBottom>
            <DetialsExplain>
                <ExplainTextDiv>
                    <div>빌린 이유</div>
                    <div>총 빌린 금액</div>
                    <div>갚아야 할 약속 날짜</div>
                </ExplainTextDiv>
                <UserDateTextDiv>
                    <UserDataText>어머니 수술비용</UserDataText>
                    <Row style={{gap: "8px"}}>
                        <UserDataText>100,000,000</UserDataText>
                        <GrayText>원</GrayText>
                    </Row>
                    <Row style={{gap:"3px"}}>
                        <UserDataText>2024.10.01</UserDataText>
                        <GrayText>일</GrayText>
                    </Row>
                </UserDateTextDiv>
            </DetialsExplain>
            <DisplayDday>D-20</DisplayDday>
        </DisplayBorderBottom>
    </Container>
    );
};

export default DetailsTransaction;
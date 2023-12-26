import React, {useState} from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Money from "../../../Assets/img/Money.png";

const Container =styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    //border: 1px solid blue; // 영역 확인을 위한 보더
`;

const SortRowDiv = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 27px;
    height: 39px;
    //border-bottom: 1px solid #DCDCDC;
`;

const AllBtn = styled.button`
    display: flex;
    flex-direction: column;
    width: 180.25px;
    border: none;
    padding: 0;
    background-color: #F1F1F1;
    justify-content: center;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 16px;
    align-items: center;

    border: 1px solid red; // 영역확인용 보더
`;

const SortLabelStyle =styled.div`
    color: #676767;

    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const DashboardList = () => {
    const theme = useTheme();

return (
<ThemeProvider theme={theme}>
    <Container>
        <SortRowDiv>
            <AllBtn>
                <Row>
                    <img src={Money} alt='지폐 아이콘'></img>
                    <SortLabelStyle>전체</SortLabelStyle>
                    <div>21건</div>
                </Row>
                
            </AllBtn>
        </SortRowDiv>

    </Container>
</ThemeProvider>
);
};

export default DashboardList;
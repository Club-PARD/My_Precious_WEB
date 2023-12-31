import React, { useState, useCallback, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
/****  MUI Libraries  *****/
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';
import { UserDataContext } from '../../../contexts/userContext';
import CheckBox from '../../../Assets/img/CheckBox.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 31.1875rem;
    height: 22.25rem;
    flex-shrink: 0;
    border-radius:  0.625rem;
    background: #FFF;
    box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
    margin-left: 3.625rem;
    align-items: center;


`;

const ContentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 26.435rem;
    padding-top: 1.12rem;

`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2.2rem;
`;

const Name = styled.div`
    display: flex;
    color: var(--grey-grey-6-secondary, #504F4F);
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1875rem; /* 95% */
`;

const BorrowMoney =styled.div`
    display: flex;
    color: #696969;
    text-align: right;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */

`;

const DetailDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`;

const GrayText =styled.div`
    display: flex;
    color: var(--grey-Grey_4, #8E8E8E);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 278.571% */

`;

const DisplayBorrowDiv = styled.div`
    display: flex;
    width: 20.5rem;
    height: 3.5rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid var(--grey-Grey_2, #D9D9D9);
    //background: #FAFAFA;
    overflow: auto;
`;

const DisplayBorrowText =styled.div`
    display: flex;
    color: var(--grey-Grey_5, #696666);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    margin: 0.5rem 0.9rem 0.5rem 0.9rem;
    width: 100%;

`;

const DisplayBorderText =styled.div`
    display: flex;
    width: 19.56rem;
    height: 2.4375rem;
    border-radius: 0.625rem;
    border: 1px solid var(--grey-Grey_2, #D9D9D9);

    flex-shrink: 0;
    color: #696969;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem;
    justify-content: end;
    padding-right: 0.94rem;
`;

const Div =styled.div`
    display: flex;
    flex-direction: row;
    width: 30rem;
    justify-content: space-evenly;
    padding-top: 1.94rem;
    align-items:center;
`;

const ChaseUpBtn =styled.button`
    display: flex;
    width: 9.875rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    background: var(--primary_orange, #FF3D00);
    border: none;
    align-items: center;
    justify-content: center;
    color: #FFFCFB;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem;
    padding: 0;
    cursor: pointer;
`;

const CheckText = styled.div`
    display: flex;
    color: #A5A5A5;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; 
`;

const CheckBoxdiv = styled.input`
    display: flex;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border: 0.1rem solid #A5A5A5;
    border-radius: 0.2rem;
    background-color: #FAFAFA; 
    cursor: pointer;
    &:checked {
        border: none;
        background-color: #FAFAFA;
        background-image:url(${CheckBox});
    }
`;

// 글읽기 페이지에서 채권자 입장(로그인 상태-> 빌려준 상태)
function CheckedMessage() {
    const theme = useTheme();
    const [userData, setUserData] = useContext(UserDataContext);
    const uid = userData.uid;

    //1. 서버에서 빌려준 메시지 get
    //2. 서버로 체크박스 값 patch or post

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentsDiv>
                    <HeaderDiv>
                        <Name>김현지 님</Name>
                        <BorrowMoney>1,000,000 원</BorrowMoney>
                    </HeaderDiv>
                    <DetailDiv>
                        <GrayText>응원메시지</GrayText>
                        <DisplayBorrowDiv>
                            <DisplayBorrowText>머글이 많이 힘들겠다... 화이팅하고 얼마 안되지만 도움이 되길 바라!!
                            </DisplayBorrowText>
                        </DisplayBorrowDiv>
                    </DetailDiv>
                    <DetailDiv style={{marginTop: "0.56rem"}}>
                        <GrayText>빌려준 금액</GrayText>
                        <DisplayBorderText>100,000 원</DisplayBorderText>
                    </DetailDiv>
                    <DetailDiv style={{marginTop: "0.56rem"}}>
                        <GrayText>돌려받을 계좌</GrayText>
                        <DisplayBorderText>수협은행   001096172521</DisplayBorderText>
                    </DetailDiv>
                </ContentsDiv>
                <Div>
                    <ChaseUpBtn>재촉편지 작성</ChaseUpBtn>
                    <CheckText> 갚은 것이 확인되면 체크해주세요</CheckText>
                    <CheckBoxdiv type='checkbox'></CheckBoxdiv>
                </Div>
            </Container>
        </ThemeProvider>
    );
}

export default CheckedMessage;
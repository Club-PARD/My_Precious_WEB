import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용

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

const TitleText = styled.div`
    color: var(--primary_orange, #FF3D00);
    text-align: center;
    font-family: Pretendard;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem; /* 78.571% */
    padding-top:  1.9375rem ;
`;

const Form =styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
`;

const Input1 = styled.input`
display: flex;
    width: 28.125rem;
    height: 5.875rem;
    flex-shrink: 0;
    overflow: auto;
    border-radius: 0.625rem;
    border: 0.0625rem solid var(--grey-Grey_2, #D9D9D9);

    &::placeholder {
        color: var(--grey-Grey_3, #B3B3B3);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    }
`;


const SaveButton = styled.button`
    margin-top: 1.31rem;
    width: 16.125rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.375em;
    background: var(--primary_orange, #FF3D00);
    border: none;

    color: #FFFCFB;

    text-align: center;
    font-family: Pretendard;
    font-size:  1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height:  2.4375rem;
    cursor: pointer;
`;

const InputBoxDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 28.125rem;
    height:  2.4375rem;
    flex-shrink: 0;
    border-radius:  0.625rem;
    border: 0.0625rem solid var(--grey-Grey_2, #D9D9D9);

    color: var(--grey-Grey_4, #8E8E8E);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 278.571% */
`;

const GaryText = styled.div`
    color: var(--grey-Grey_4, #8E8E8E);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height:  2.4375rem; /* 278.571% */
    padding-left: 0.9375rem;
`;

const Input2 = styled.input`
    width: 22.125rem;
    border: none;
    border-radius: 0.625rem;
    &::placeholder {
        color: var(--grey-Grey_3, #B3B3B3);
        text-align: right;
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2.4375rem; /* 325% */
    }

`;

const SelectBank = styled.div`
    color: var(--grey-Grey_3, #B3B3B3);
    text-align: right;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4375rem; /* 325% */
`;

const Input3 =styled.input`
    width: 18.005rem;
    border: none;

    &::placeholder {
        color: var(--grey-Grey_3, #B3B3B3);
        text-align: left;
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2.4375rem;
    }
`;

function WritingMessage() {
    const theme = useTheme();


    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TitleText>꼭 송금한 이후 작성해주세요.</TitleText>
                <Form>
                    <Input1 type='text' placeholder='친구에게 간단한 응원 메세지를 함께 남겨보세요. 머니글러브가 도움을 잘 \n 간직하고 있을게요. 해당글은 현지님이 계속해서 볼 수 있어요.'></Input1>
                        <InputBoxDiv  style={{marginTop:"1.5rem"}} >
                            <GaryText>빌려준 금액</GaryText>
                            <Input2 type='text' placeholder='금액을 선정할 때, 절대 무리해서  빌려주지 않도록 유의해주세요!'></Input2>
                        </InputBoxDiv>
                        <InputBoxDiv style={{marginTop: "0.5rem"}}>
                            <GaryText>돌려받을 계좌</GaryText>
                            <SelectBank>은행명</SelectBank>
                            <Input3 type='text' placeholder='계좌번호'></Input3>
                        </InputBoxDiv>
                    <SaveButton>저장하기</SaveButton>
                </Form>
            </Container>
        </ThemeProvider>
    );
}

export default WritingMessage;
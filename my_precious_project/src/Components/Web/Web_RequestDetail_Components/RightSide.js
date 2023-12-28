import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import WritingMessage from './WritingMessage.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

`;

const BorrowButton = styled.button`
    width: 17.1875rem;
    height: 3.4375rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background: var(--primary_orange, #FF3D00);

    color: #FFF;

    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem;
    border: none;
    cursor: pointer; 
    margin-left: 10.6875rem;
`;


function RightSide(props) {
    const theme = useTheme();
    const [clickstate, setClickstate] =useState(false); 

    const handleBurrowConfirmation = (event) => {
        // 기본 양식 제출 동작 방지
        event.preventDefault();
  
        setClickstate(!clickstate);
    };


    return (
        <ThemeProvider theme={theme}>
            {clickstate ===false ? (
            <BorrowButton onClick={handleBurrowConfirmation}>빌려주기</BorrowButton> ): (<WritingMessage/>)}
        </ThemeProvider>
    );
}

export default RightSide;

import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용

const Container = styled.button`
    display: flex;
    width: 19.625rem;
    height: 3.54031rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: var(--White_2, #FAFAFA);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: none;
    justify-content: center;
    align-items: center;
`;

const Row =styled.div`
    display: flex;
    flex-direction: row;
    width: 17rem;
    justify-content: space-between;

    color: #696969;
    text-align: right;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */
    align-items: center;
`;

function SummaryFriend() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Row>
                    <div>김현중</div>
                    <div>10,000 원</div>
                </Row>
            </Container>
        </ThemeProvider>
    );
}

export default SummaryFriend;

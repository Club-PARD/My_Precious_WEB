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
    background: ${(props) => (props.isSelected ? '#FFCDBD' : '#FAFAFA')};
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
    border: ${(props) => (props.isSelected ? '1px solid #FF6A3B' : 'none')};
    justify-content: center;
    align-items: center;
    margin-bottom: 0.56rem;
    cursor: pointer;
`;

const Row =styled.div`
    display: flex;
    flex-direction: row;
    width: 17rem;
    justify-content: space-between;

    color: ${(props) => (props.isSelected ? '#3E3E3E' : '#696969')};
    text-align: right;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */
    align-items: center;
`;

function SummaryFriend(props) {
    const theme = useTheme();

    const formatNum =parseFloat(props.money).toLocaleString();

    return (
        <ThemeProvider theme={theme}>
            <Container isSelected={props.isSelected} onClick={props.onClick} disabled={props.isSelected} >
                <Row >
                    <div>{props.name}</div>
                    <div>{formatNum} 원</div>
                </Row>
            </Container>
        </ThemeProvider>
    );
}

export default SummaryFriend;
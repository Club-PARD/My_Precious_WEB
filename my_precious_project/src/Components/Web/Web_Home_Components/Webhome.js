import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import FirstHome from './FirstHome.js';
import MoveText from "../../../Assets/img/MoveText.svg";
import InfiniteHorizontalAnimation from './InfiniteHorizontalAnimation.js';
import TextFadeinAnimation from './TextFadeinAnimation.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const Div1 =styled.div`
    color:red;
    font-size: 30px;
`;

const WebHome = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
            </Container>
        </ThemeProvider>
    );
};

export default WebHome;

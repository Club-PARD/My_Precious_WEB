import React, { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import FirstHome from './FirstHome.js';
import HomeHeader from './HomeHeader.js';

const WebHome = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <HomeHeader backcolor={'transparent'}></HomeHeader>
                <FirstHome />
            </Container>
        </ThemeProvider>
    );
};

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
`;

export default WebHome;

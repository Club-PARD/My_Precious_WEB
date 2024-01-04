import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import FirstHome from './FirstHome.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const WebHome = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <FirstHome/>
            </Container>
        </ThemeProvider>
    );
};

export default WebHome;

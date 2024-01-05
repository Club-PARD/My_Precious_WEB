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
                <FirstHome/>
                    <InfiniteHorizontalAnimation/>
                    <TextFadeinAnimation fadeinTime={0.5}>
                        <Div1>안녕하세요</Div1>
                    </TextFadeinAnimation>
                    <TextFadeinAnimation fadeinTime={1}>
                        <Div1>반갑습니다</Div1>
                    </TextFadeinAnimation>
                    <TextFadeinAnimation fadeinTime={1.5}>
                        <Div1>수고하십니다</Div1>
                    </TextFadeinAnimation>
            </Container>
        </ThemeProvider>
    );
};

export default WebHome;

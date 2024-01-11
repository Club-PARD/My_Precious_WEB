import React, { useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import FirstHome from './FirstHome.js';
import HomeHeader from './HomeHeader.js';
import Onboarding from '../../../Assets/img/Onboarding.svg';

const Div1 =styled.div`
    color:red;
    font-size: 30px;
`;

const WebHome = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <HomeHeader backcolor={'transparent'}></HomeHeader>
                <FirstHome />
                <ImgDiv>
                    <OnboardingImg src={Onboarding} alt="온보딩 이미지" />
                </ImgDiv>
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
    position: relative;
    background-color: #f1f1f1;
`;
const ImgDiv = styled.div`
    margin-top: 13rem;
    width: 100%;
`;
const OnboardingImg = styled.img`
    width: 100%;
`;

export default WebHome;

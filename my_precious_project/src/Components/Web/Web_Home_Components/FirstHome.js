import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import HomeTopImage from '../../../Assets/img/HomeTopImage.svg';
import TextFadeinAnimation from './TextFadeinAnimation.js';
import InfiniteHorizontalAnimation from './InfiniteHorizontalAnimation.js';

const FirstHome = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <FistScreenDiv>
                    <IntroDiv>
                        <TextFadeinAnimation fadeinTime={1.0}>
                            <Div1>돈도 지키고</Div1>
                        </TextFadeinAnimation>
                        <TextFadeinAnimation fadeinTime={1.5}>
                            <Div1>우정도 지키고 싶다면?</Div1>
                        </TextFadeinAnimation>
                        <TextFadeinAnimation fadeinTime={2}>
                            <Div2>MoneyGlove!</Div2>
                        </TextFadeinAnimation>
                        <TextFadeinAnimation fadeinTime={3.1}>
                            <SeconDiv>친구 간 1:N 채무 관계 체결 서비스</SeconDiv>
                        </TextFadeinAnimation>
                        <TextFadeinAnimation fadeinTime={3.4}>
                            <ButtonDiv>
                                <StartButton>시작하기</StartButton>
                            </ButtonDiv>
                        </TextFadeinAnimation>
                    </IntroDiv>
                    <HomeTopImageDiv />
                </FistScreenDiv>
                <InfiniteHorizontalAnimation />
            </Container>
        </ThemeProvider>
    );
};

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
`;

const FistScreenDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const HomeTopImageDiv = styled.div`
    display: flex;
    width: 60.6875rem;
    height: 59.875rem;
    flex-shrink: 0;
    background-image: url(${HomeTopImage});
    background-repeat: no-repeat;
    background-size: contain;
`;

const IntroDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 10.5rem;
    padding-top: 8rem;
    align-items: flex-start;
    margin-top: 13rem;
`;

const Div1 = styled.div`
    color: #333;
    font-family: Pretendard;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.875rem; /* 115% */
    letter-spacing: -0.05rem;
`;
const Div2 = styled.div`
    color: #333;
    font-family: Pretendard;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: 3rem; /* 120% */
    letter-spacing: -0.025rem;
`;

const SeconDiv = styled.div`
    margin-top: 3rem;
    color: #333;
    font-family: Pretendard;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
`;

const ButtonDiv = styled.div`
    margin-top: 1.5rem;
`;

const StartButton = styled.button`
    width: 18.8125rem;
    height: 2.9375rem;
    flex-shrink: 0;
    border-radius: 0.42219rem;
    background-color: #ff3d00;
    color: white;
    border: none;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 800;
    cursor: pointer;
`;

export default FirstHome;

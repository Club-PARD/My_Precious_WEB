//import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import { useNavigate } from 'react-router-dom';
import Userheart from '../../../Assets/img/Userheart.png';
import {handleGoogleLogin} from "../../../API/googleLogin.js"

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    height: 100vh;
    justify-content: center;
`;

const LayoutDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentDiv = styled.div`
    display: flex;
    margin-top: 15.375rem;
    flex-direction: column;
    align-items: center;
`;

const WelcomeText = styled.div`
    display: flex;
    color: #FF3D00;

    text-align: center;
    font-family: Pretendard;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing:  0.02rem;
`;

const IntroDiv = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 1.4375rem;
`;

const IntroductionText = styled.div`
    display: flex;
    color: #0F0F0F;

    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
`;

const MuggleCount = styled.span`
    display: flex;
    color: #0F0F0F;
    height: 2rem;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem;
    padding-left: 0.3125rem;
`;

const GoogleLoginBtn = styled.button`
    display: flex;
    width: 19.5rem;
    height: 3.9375rem;
    flex-shrink: 0;
    border-radius: 0.6875rem;
    background: var(--primary_orange, #FF3D00);
    border: none;
    justify-content: center;
    align-items: center;
    margin-top: 1.6875rem;

    color: #F5F5F5;
    font-family: Pretendard;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    cursor: pointer;
`;

const GuideText = styled.div`
    display: flex;
    color: #BFB9B9;
    padding-top: 0.9375rem;

    text-align: center;
    font-family: Pretendard;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.375rem;
`;

const Googlelogin = () => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container>
            <LayoutDiv>
                <ContentDiv>
                    <WelcomeText>환영합니다.</WelcomeText>
                        <IntroDiv>
                            <IntroductionText>지금 함께 하면 머니글러브의 </IntroductionText>
                            <MuggleCount> 7,942번째 머글</MuggleCount>
                            <IntroductionText>이 되어요!</IntroductionText>
                        </IntroDiv>
                    <IntroductionText>여러분의 돈과 관계를 소중히 지켜드립니다. 함께 해주시겠어요?</IntroductionText>
                    <img src={Userheart} alt='유저와 하트 이미지' style={{marginTop:"0.625rem"}}></img>
                    <GoogleLoginBtn onClick={handleGoogleLogin}>Google로 로그인</GoogleLoginBtn>
                    <GuideText>구글 로그인과 간단한 3가지 추가 정보만<br></br> 입력하면 회원가입이 완료되어요.</GuideText>
                </ContentDiv>
            </LayoutDiv>
            </Container>
        </ThemeProvider>
    );
};

export default Googlelogin;

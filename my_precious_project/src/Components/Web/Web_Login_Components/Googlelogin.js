import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../../Assets/img/LoginImage.png';
import { handleGoogleLogin } from '../../../API/googleLogin.js';
import { UserContext } from '../../../contexts/userContext';

const Googlelogin = () => {
    const [logInData, setLogInData] = useContext(UserContext);
    const theme = useTheme();
    const googleLogin = () => {
        handleGoogleLogin(setLogInData);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <LayoutDiv>
                    <ContentDiv>
                        <WelcomeText>환영합니다.</WelcomeText>
                        <IntroductionText>
                            여러분의 돈과 관계를 소중히 지켜드립니다.
                        </IntroductionText>
                        <IntroDiv>
                            <IntroductionText>지금 함께 하면 머니글러브의 </IntroductionText>
                            <MuggleCount> 7,942번째 머글</MuggleCount>
                            <IntroductionText>이 되어요! 함께 해주시겠어요?</IntroductionText>
                        </IntroDiv>
                        
                        <img src={LoginImage} alt="유저와 하트 이미지" style={{ marginTop: '3rem' }}></img>
                        <GoogleLoginBtn onClick={googleLogin}>Google로 로그인</GoogleLoginBtn>
                        <GuideText>
                            구글 로그인과 간단한 3가지 추가 정보만<br></br> 입력하면 회원가입이 완료되어요.
                        </GuideText>
                    </ContentDiv>
                </LayoutDiv>
            </Container>
        </ThemeProvider>
    );
};

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
    color: #ff3d00;

    color: #FF3D00;
    text-align: center;
    font-family: ${(props) => props.theme.FontFamily.Pretendard};
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.02rem;
    padding-bottom: 1.31rem;
`;

const IntroDiv = styled.div`
    display: flex;
    flex-direction: row;
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
    color: #0f0f0f;
    color: #0F0F0F;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem;
    padding-left:  0.3125rem;
`;

const GoogleLoginBtn = styled.button`
    display: flex;
    width: 29.51188rem;
    height: 3.46206rem;
    flex-shrink: 0;
    border-radius: 0.42219rem;
    background: var(--primary_orange, #FF3D00);
    border: none;
    justify-content: center;
    align-items: center;
    margin-top: 3.61rem;

    color: #F5F5F5;

    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    cursor: pointer;
`;

const GuideText = styled.div`
    display: flex;
    padding-top: 1.29rem;

    color: #BFB9B9;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.375rem; /* 146.667% */
`;

export default Googlelogin;

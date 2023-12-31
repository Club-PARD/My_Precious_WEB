import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context API 적용
import WritingMessage from './WritingMessage.js';
import Character from '../../../Assets/img/Character.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    position: relative;
`;

const BorrowButton = styled.button`
    width: 17.1875rem;
    height: 3.4375rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background: ${(under100) => (under100 ? '#D9D9D9' : '#FF3D00')};
    color: #FFF;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem;
    border: none;
    cursor: pointer;
    margin-left: 17.6875rem;z-index: 1;
`;

const ImageCharacter = styled.div`
    position: absolute;
    width: 16rem;
    height: 16rem;
    background-image:url(${Character});
    background-repeat:no-repeat;
    background-size: contain;
    top: -190px;
    left: 70%;
    z-index: 0;
    display: flex;
    //justify-content: center;
    //align-items: center;
`;

const WritingMessageContainer = styled.div`
    animation: ${fadeIn} 0.8s ease;
`;

function RightSide({under100}) {
    const theme = useTheme();
    const [clickstate, setClickstate] = useState(false);

    // 버튼 활성화 여부를 결정할 상태 추가
    const [isButtonDisabled, setIsButtonDisabled] = useState(under100);
    useEffect(() => {
        setIsButtonDisabled(under100);
      }, [under100]);

    //console.log("빌려주기 버튼 상태",isButtonDisabled)

    const handleBurrowConfirmation = (event) => {
        // 기본 양식 제출 동작 방지
        event.preventDefault();

        setClickstate(!clickstate);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                {clickstate === false ? (
                    <>
                    <ImageCharacter/>
                    <BorrowButton onClick={handleBurrowConfirmation} 
                    disabled={isButtonDisabled}>도와주기</BorrowButton>
                    </>
                ) : (
                    <WritingMessageContainer>
                        <WritingMessage />
                    </WritingMessageContainer>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default RightSide;

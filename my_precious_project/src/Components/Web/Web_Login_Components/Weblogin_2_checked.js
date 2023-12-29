import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js.js'; // Context APi 적용
import DotButton from './DotButton.js';
import { Checkmark } from 'react-checkmark';
import { useNavigate } from 'react-router-dom';

const WebLogin_2_checked = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleConfirmation = (event) => {
      // 기본 양식 제출 동작 방지
      event.preventDefault();

      navigate('/Login/4');
  };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentBox>
                    <InnerRow1>
                        <DotButton dotColor={2} />
                    </InnerRow1>
                    <InnerRow2>휴대폰 인증이 완료되었어요!</InnerRow2>
                    <InnerRow3>
                        <Checkmark size="xLarge" color="#ff3d00"></Checkmark>
                        <Div>
                            등록하신 휴대폰 인증을 통해<br></br>전자서명을 따로 하시지 않아도 되는 편리함이 생겼어요.
                        </Div>
                        <form>
                            <Button onClick={handleConfirmation}>확인</Button>
                        </form>
                    </InnerRow3>
                </ContentBox>
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

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 31.25rem;
`;
const InnerRow1 = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 9.6875rem;
    margin-bottom: 3.125rem;
`;

const InnerRow2 = styled.div`
    color: #000;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.125rem;
    width: 100%;
    margin-bottom: 6.25rem;
`;

const InnerRow3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 500;
    color: #d9d9d9;
`;

const Div = styled.div`
    margin-top: 3.125rem;
`;

const Button = styled.button`
    margin-top: 100px;
    width: 28.125rem;
    height: 3.4375rem;
    border-radius:  0.40625rem;
    border: none;
    color: white;
    font-size: 1.25rem;
    font-weight: 500;
    background-color: #ff3d00;
    cursor: pointer;
`;

export default WebLogin_2_checked;

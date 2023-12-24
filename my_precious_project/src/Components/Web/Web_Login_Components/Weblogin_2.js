import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DotButton from './DotButton.js';

const WebLogin_2 = () => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentBox>
                    <InnerRow1>
                        <DotButton dotColor={2} />
                    </InnerRow1>
                    <InnerRow2>
                        휴대폰 인증을 하면<br></br>전자서명이 가능해요!
                    </InnerRow2>
                    <InnerRow3>
                        전화번호<br></br>
                        <form>
                            <Label1>
                                <input type="text" placeholder="010-xxxx-xxxx"></input>
                                <button>인증번호 받기</button>
                            </Label1>
                            <Label2>
                                <input type="text" placeholder="인증번호 입력"></input>
                                <button>확인</button>
                            </Label2>
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
    width: 400px;
`;
const InnerRow1 = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 155px;
    margin-bottom: 50px;
`;

const InnerRow2 = styled.div`
    color: #000;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    line-height: 50px;
    width: 100%;
    margin-bottom: 100px;
`;

const InnerRow3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    color: #d9d9d9;
`;

const Label1 = styled.label`
    position: relative;
    width: 100%;
    input {
        margin-top: 30px;
        width: 400px;
        height: 55px;
        border: 1.5px solid #ff3d00;
        border-radius: 6.5px;
        text-indent: 55px;
        font-size: 20px;
        font-weight: 500;
        &::placeholder {
            color: #d9d9d9;
            font-size: 20px;
            font-weight: 500;
        }
    }
    input:focus {
        outline: none;
    }
    button {
        position: absolute;
        margin-top: 31px;
        right: 0;
        width: 150px;
        height: 58px;
        border-radius: 6.5px;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: 500;
        background-color: #ff3d00;
        cursor: pointer;
    }
`;

const Label2 = styled.label`
    position: relative;
    width: 100%;
    input {
        margin-top: 30px;
        width: 400px;
        height: 55px;
        border: 1.5px solid #ff3d00;
        border-radius: 6.5px;
        text-indent: 55px;
        font-size: 20px;
        font-weight: 500;
        &::placeholder {
            color: #d9d9d9;
            font-size: 20px;
            font-weight: 500;
        }
    }
    input:focus {
        outline: none;
    }
    button {
        position: absolute;
        margin-top: 31px;
        right: 0;
        width: 150px;
        height: 58px;
        border-radius: 6.5px;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: 500;
        background-color: #ff3d00;
        cursor: pointer;
    }
`;

export default WebLogin_2;

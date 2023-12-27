<<<<<<< HEAD
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DotButton from './DotButton.js';
import loginImage from '../../../Assets/img/LoginImage.png';
=======
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import DotButton from "./DotButton.js";
import loginImage from "../../../Assets/img/LoginImage.png";
>>>>>>> main

const WebLogin_3 = () => {
  const theme = useTheme();

<<<<<<< HEAD
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentBox>
                    <InnerRow1>
                        <DotButton dotColor={3} />
                    </InnerRow1>
                    <InnerRow2>
                        너무 환영합니다! <br />
                        우리 머니글러브의 45번째 머글이 되어주셔서 감사해요.
                    </InnerRow2>
                    <InnerRow3>
                        <ImageDiv>
                            <Img src={loginImage} alt="로그인페이지 기본 이미지"></Img>
                            <NameDiv>김현지님</NameDiv>
                        </ImageDiv>
                        <form>
                            <Button>시작하기</Button>
                        </form>
                    </InnerRow3>
                </ContentBox>
            </Container>
        </ThemeProvider>
    );
=======
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ContentBox>
          <InnerRow1>
            <DotButton dotColor={3} />
          </InnerRow1>
          <InnerRow2>
            너무 환영합니다! <br />
            우리 머니글러브의 45번째 머글이 되어주셔서 감사해요.
          </InnerRow2>
          <InnerRow3>
            <ImageDiv>
              <Img src={loginImage} alt="로그인페이지 기본 이미지"></Img>
              <NameDiv>김현지님</NameDiv>
            </ImageDiv>
            <form>
              <Button>시작하기</Button>
            </form>
          </InnerRow3>
        </ContentBox>
      </Container>
    </ThemeProvider>
  );
>>>>>>> main
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
  //width: 500px;
`;
const InnerRow1 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 157px;
  margin-bottom: 50px;
`;

const InnerRow2 = styled.div`
<<<<<<< HEAD
    color: #0f0f0f;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    line-height: 50px;
    width: 100%;
    white-space: pre-wrap;
=======
  color: #0f0f0f;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 50px;
  width: 100%;
  white-space: pre-wrap;
>>>>>>> main
`;

const InnerRow3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  color: #d9d9d9;
`;

const ImageDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 39px;
    width: 250px;
    height: 292px;
    flex-shrink: 0;

<<<<<<< HEAD
    border-radius: 20px;
    border: 2px solid #ff3d00;
    align-items: center;
`;

const Img = styled.img`
    margin-top: 50px;
`;

const NameDiv = styled.div`
    width: 155px;
    height: 44px;
    flex-shrink: 0;
    margin-top: 43.71px;
    color: #ff3d00;
    text-align: center;
    //font-family: Pretendard;
    font-size: 32.886px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
=======
  border-radius: 20px;
  border: 2px solid #ff3d00;
  align-items: center;
`;

const Img = styled.img`
  margin-top: 50px;
`;

const NameDiv = styled.div`
  width: 155px;
  height: 44px;
  flex-shrink: 0;
  margin-top: 43.71px;
  color: #ff3d00;
  text-align: center;
  //font-family: Pretendard;
  font-size: 32.886px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
>>>>>>> main
`;

const Button = styled.button`
  margin-top: 49px;
  width: 450px;
  height: 55px;
  border-radius: 6.5px;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 500;
  background-color: #ff3d00;
  cursor: pointer;
`;

export default WebLogin_3;

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js.js"; // Context APi 적용
import DotButton from "./DotButton.js";
import { Checkmark } from "react-checkmark";

<<<<<<< HEAD
const WebLogin_2_checked = () => {
=======
const WebLogin_3 = () => {
>>>>>>> main
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ContentBox>
          <InnerRow1>
            <DotButton  />
          </InnerRow1>
          <InnerRow2>휴대폰 인증이 완료되었어요!</InnerRow2>
          <InnerRow3>
            <Checkmark size="xLarge" color="#ff3d00"></Checkmark>
            <Div>
              등록하신 휴대폰 인증을 통해<br></br>전자서명을 따로 하시지 않아도
              되는 편리함이 생겼어요.
            </Div>
            <form>
              <Button>확인</Button>
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
  width: 500px;
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
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  color: #d9d9d9;
`;

const Div = styled.div`
  margin-top: 50px;
`;

const Button = styled.button`
  margin-top: 100px;
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

<<<<<<< HEAD
export default WebLogin_2_checked;
=======
export default WebLogin_3;
>>>>>>> main

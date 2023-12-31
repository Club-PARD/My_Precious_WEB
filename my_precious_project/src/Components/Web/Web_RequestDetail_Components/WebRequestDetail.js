import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import Header from "../Layout_Components/Mypage_header.js";
import LeftSide from "./LeftSide.js";
import RightSide from "./RightSide.js";
import Character from "../../../Assets/img/Character.png";

function WebRequestDetail() {
  let boardId = useParams();
  // boardId = boardId.board_id;
  console.log(boardId);
  const theme = useTheme();
  //모인 금액이 받길 원하는 금액을 넘지 않았을 경우
  const [under100, setUnder100] = useState(false);
  //메시지 전송했으면 왼쪽 화면 업데이트
  const [updateLeftSide, setUpdateLeftSide] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header backcolor={"#E5E5E5"} />
        <ImageCharacter />
        <ContainerDiv>
          <Div>
            <LeftSide
              under100={under100}
              setUnder100={setUnder100}
              updateLeftSide={updateLeftSide}
              boardId={boardId}
            />
            <RightSide
              under100={under100}
              updateLeftSide={updateLeftSide}
              setUpdateLeftSide={setUpdateLeftSide}
              boardId={boardId}
            />
          </Div>
        </ContainerDiv>
      </Container>
    </ThemeProvider>
  );
}

const ImageCharacter = styled.div`
  position: absolute;
  width: 4.43025rem;
  height: 6.5625rem;
  background-image: url(${Character});
  background-repeat: no-repeat;
  background-size: contain;
  top: 8rem;
  left: 30rem;
  z-index: 1;
  display: flex;
  //justify-content: center;
  //align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background: #e5e5e5;
  overflow: hidden;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  /* height: 100vh; */
  width: 100%;
  background: #e5e5e5;
  overflow: hidden;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 9.19rem;
  box-sizing: border-box;
`;

export default WebRequestDetail;

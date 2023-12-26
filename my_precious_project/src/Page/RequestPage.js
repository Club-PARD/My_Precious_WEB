import React from "react";
import { useMediaQuery } from "react-responsive";
import AppHome from "../Components/App/App_Home_Components/AppHome";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../contexts/ThemeContext.js"; // Context APi 적용

const RequestPage = () => {
  const theme = useTheme();
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppHome />
        </div>
      ) : (
        <Container>
          <MainText>
            친구에게 돈을 빌리는 것은 당연한 게 아니에요! <br />
            고마운 친구에게 예쁜말로 부탁해보는 건 어떨까요?
          </MainText>
          <InputTitle>
            <input
              type="text"
              placeholder="제목: 예시) 어머님 수술비가 위급합니다. 조금이라도 도와주세요.."
            ></input>
          </InputTitle>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.div`
  width: 642px;
  color: #ff3d00;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 44px; /* 137.5% */
  margin-top: 94px;
  text-align: left;
`;

const InputTitle = styled.div`
  margin-top: 36px;
  input {
    box-sizing: border-box;
    width: 694px;
    height: 51px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #e0e0e0;
    border: none;
    padding: 6px 17px 6px 17px;
    &::placeholder {
      color: #a5a5a5;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 39px; /* 216.667% */
    }
  }
  input:focus {
    outline: none;
  }
`;

export default RequestPage;

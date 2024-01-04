import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import DotButton from "./DotButton.js";
import loginImage from "../../../Assets/img/LoginImage.png";
import { useUserData } from "../../../contexts/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WebLogin_3 = () => {
  const theme = useTheme();
  const [userData, setUserData] = useUserData();
  const [total, setTotal] = useState(null);

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://httptest.dhdhh.shop/api/v23/users"
        );
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ContentBox>
          <InnerRow1>
            <DotButton dotColor={3} />
          </InnerRow1>
          <InnerRow2>
            준비 완료! <br />
            우리 머니글러브의 {total}번째 머글이 되어주셔서 감사해요.
          </InnerRow2>
          <InnerRow3>
            <ImageDiv>
              <Img src={loginImage} alt="로그인페이지 기본 이미지"></Img>
              <NameDiv>{userData.name} 님</NameDiv>
            </ImageDiv>
            <form>
              <Button onClick={navigateToDashboard}>시작하기</Button>
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
`;
const InnerRow1 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 9.8125rem;
  margin-bottom: 3.125rem;
`;

const InnerRow2 = styled.div`
  color: #1a1a1a;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.625rem;
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

const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.48rem;
  width: 15.625rem;
  height: 13.1875rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 0.125rem solid #ff3d00;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 150px;
`;

const NameDiv = styled.div`
  box-sizing: border-box;
  width: 9.6875rem;
  height: 2.75rem;
  flex-shrink: 0;
  color: #ff3d00;
  margin-top: 1.04rem;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.625rem; /* 150% */
`;

const Button = styled.button`
  margin-top: 3.13rem;
  width: 27.125rem;
  height: 3.46206rem;
  border-radius: 0.42219rem;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.94213rem;
  background-color: #ff3d00;
  cursor: pointer;
`;

export default WebLogin_3;

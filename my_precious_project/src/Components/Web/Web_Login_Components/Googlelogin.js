import React, { useState, useEffect, useCallback, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import { useNavigate } from "react-router-dom";
import Userheart from "../../../Assets/img/Userheart.png";
import { handleGoogleLogin } from "../../../API/googleLogin.js";
import { UserContext } from "../../../contexts/userContext";
import { UserDataContext } from "../../../contexts/userContext";
import axios from "axios";

const Googlelogin = () => {
  const [logInData, setLogInData] = useContext(UserContext);
  const [userData, setUserData] = useContext(UserDataContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const googleLogin = () => {
    handleGoogleLogin(setLogInData, setUserData, navigate);
  };
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/users"
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
        <LayoutDiv>
          <ContentDiv>
            <WelcomeText>환영합니다.</WelcomeText>
            <IntroDiv>
              <IntroductionText>지금 함께 하면 머니글러브의 </IntroductionText>
              <MuggleCount> {total + 1}번째 머글</MuggleCount>
              <IntroductionText>이 되어요!</IntroductionText>
            </IntroDiv>
            <IntroductionText>
              여러분의 돈과 관계를 소중히 지켜드립니다. 함께 해주시겠어요?
            </IntroductionText>
            <img
              src={Userheart}
              alt="유저와 하트 이미지"
              style={{ marginTop: "10px" }}
            ></img>
            <GoogleLoginBtn onClick={googleLogin}>
              Google로 로그인
            </GoogleLoginBtn>
            <GuideText>
              구글 로그인과 간단한 3가지 추가 정보만<br></br> 입력하면
              회원가입이 완료되어요.
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
  margin-top: 246px;
  flex-direction: column;
  align-items: center;
`;

const WelcomeText = styled.div`
  display: flex;
  color: #ff3d00;

  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.32px;
`;

const IntroDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 23px;
`;

const IntroductionText = styled.div`
  display: flex;
  color: #0f0f0f;

  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
`;

const MuggleCount = styled.span`
  display: flex;
  color: #0f0f0f;
  height: 32px;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  padding-left: 5px;
`;

const GoogleLoginBtn = styled.button`
  display: flex;
  width: 312px;
  height: 63px;
  flex-shrink: 0;
  border-radius: 11px;
  background: var(--primary_orange, #ff3d00);
  border: none;
  justify-content: center;
  align-items: center;
  margin-top: 27px;

  color: #f5f5f5;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  cursor: pointer;
`;

const GuideText = styled.div`
  display: flex;
  color: #bfb9b9;
  padding-top: 15px;

  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

export default Googlelogin;

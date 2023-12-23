import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext.js.js"; // Context APi 적용

// theme 파일 폰트 적용 방법 + style-components 사용
const Header1 = styled.div`
  font-size: ${(props) => props.theme.Web_fontSizes.Header1};
  font-weight: ${(props) => props.theme.fontWeights.Header1};
  line-height: ${(props) => props.theme.LineHeight.Header1};
  color: ${(props) => props.theme.colors.text};
  font-family: "Pretendard";
`;

const Header2 = styled.div`
  font-size: ${(props) => props.theme.Web_fontSizes.Header2};
  font-weight: ${(props) => props.theme.fontWeights.Header2};
  line-height: ${(props) => props.theme.LineHeight.Header2};
  color: ${(props) => props.theme.colors.accent};
  font-family: "Pretendard";
`;

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
  //width: 60%;
  background-color: red; //크기 확인용- 지워야함
  align-items: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue; //크기확인용2 -지워야함
  //height: 40%;
  //width: 60%;
  align-items: center;
  margin-top: 157px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const DotRow = styled(Row)`
  width: 94.573px;
  height: 15.537px;
  flex-shrink: 0;
  justify-content: space-between;
`;

const DotButton = styled.div`
  width: 14.86px;
  height: 15.54px;
  background-color: #d9d9d9;
  //border: 0px solid #D9D9D9;
  border-radius: 50%;
`;

const ExplainDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 51px;

  width: 355px;
  height: 102px;
  margin-top: 45.26px;
`;

const WebLogin_1 = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LayoutDiv>
          <ContentDiv>
            <DotRow>
              <DotButton></DotButton>
              <DotButton></DotButton>
              <DotButton></DotButton>
            </DotRow>
            <ExplainDiv>
              고객님의 소중한 거래를 위해 추가 정보를 기입해주세요.
            </ExplainDiv>
            <Row>
              <div>이름 칸</div>
              <div>생년월일 칸</div>
            </Row>
          </ContentDiv>
        </LayoutDiv>
      </Container>
    </ThemeProvider>
  );
};

export default WebLogin_1;

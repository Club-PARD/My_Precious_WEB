import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../../Style/theme";
//import { Link } from "react-router-dom";

// theme 파일 폰트 적용 방법 + style-components 사용
const Header1 = styled.div`
  font-size: ${(props) => props.theme.Web_fontSizes.Header1};
  font-weight: ${(props) => props.theme.fontWeights.Header1};
  line-height: ${(props) => props.theme.LineHeight.Header1};
  color: ${(props) => props.theme.colors.primary};
  font-family: "Pretendard";
`;

const AppDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header1>대쉬보드 페이지</Header1>
    </ThemeProvider>
  );
};

export default AppDashboard;

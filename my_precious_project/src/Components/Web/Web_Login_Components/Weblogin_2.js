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

const WebLogin_2 = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div></div>
    </ThemeProvider>
  );
};

export default WebLogin_2;

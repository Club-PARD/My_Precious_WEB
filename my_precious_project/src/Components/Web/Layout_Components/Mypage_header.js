import React from "react";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import MGLogo from "../../../Assets/img/MGLogo.svg";

const Header = (props) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Navigation bgcolor={props.color}>
        <LogoImg src={MGLogo} alt="로고이미지"></LogoImg>
        <NavRightSideDiv>
          <AboutBtn>ABOUT US</AboutBtn>
          <DashboardBtn>DASHBOARD</DashboardBtn>
        </NavRightSideDiv>
      </Navigation>
    </ThemeProvider>
  );
};

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  /* padding-top: 33px;
  padding-bottom: 75px; */
  flex-shrink: 0;
  background: ${(props) => (props.bgcolor === 1 ? "#E5E5E5" : "#F1F1F1")};
  justify-content: space-between;
  align-items: center;
  position: fixed;
  /* left: 0; */
  top: 1.94rem;

  & button {
    background: ${(props) => (props.bgcolor === 1 ? "#E5E5E5" : "#F1F1F1")};
  }

  & div {
    background: ${(props) => (props.bgcolor === 1 ? "#E5E5E5" : "#F1F1F1")};
  }
`;

const LogoImg = styled.img`
  width: 135px;
  height: 46.5px;
`;

const NavRightSideDiv = styled.div`
  display: flex;
  border: none;
  width: 12.75rem;
`;
const AboutBtn = styled.button`
  display: flex;
  border: none;
  padding: 0;
  margin: 0;

  color: #504f4f;

  font-family: Work Sans;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const DashboardBtn = styled.button`
  display: flex;
  border: none;
  padding: 0;
  margin: 0;
  margin-left: 2.5625rem;

  color: #ff3d00;

  font-family: Work Sans;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

export default Header;

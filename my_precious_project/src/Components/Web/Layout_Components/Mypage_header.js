import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 51px;
  flex-shrink: 0;
  background: #D9D9D9;
  justify-content: space-between;
`;

const LogoBtn =styled.button`
  color: #FF3D00;
  padding: 0;
  margin: 0;
  margin-left: 39px;
  border: none;
  background-color: #D9D9D9;
 
  font-family: Quanta Grotesk Pro;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 43.305px;
  cursor: pointer;
`;

const NavRightSideDiv = styled.div`
  display: flex;
  background-color: #D9D9D9;
  border: none;
  width: 204px;
  margin-right: 114px;
  align-items: center;
`
const AboutBtn =styled.button`
  display: flex;
  background-color: #D9D9D9;
  border: none;
  padding: 0;
  margin: 0;

  color: #504F4F;

  font-family: Work Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 43.305px; 
  cursor: pointer;
`;

const DashboardBtn = styled.button`
  display: flex;
  background-color: #D9D9D9;
  border: none;
  padding: 0;
  padding: 10px 0 10px;
  margin: 0;
  margin-left: 45px;

  color: #FF3D00;

  font-family: Work Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const Header = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
           <Navigation>
              <LogoBtn>MONEY GLOVE!</LogoBtn>
              <NavRightSideDiv>
                <AboutBtn>ABOUT US</AboutBtn>
                <DashboardBtn>DASHBOARD</DashboardBtn>
              </NavRightSideDiv>
           </Navigation>
        </ThemeProvider>
    );
};

export default Header;


import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 1.4375rem;
  flex-shrink: 0;
  background: ${(props) => (props.bgcolor === "gray" ? "#FAFAFA" : "#E5E5E5")};
  justify-content: space-between;
  align-items: start;
`;

const LogoBtn =styled.button`
  color: #FF3D00;
  padding: 0;
  margin: 0;
  margin-left: 2.9375rem;
  border: none;
  background-color: ${(props) => (props.bgcolor === "gray" ? "#FAFAFA" : "#E5E5E5")};
 
  font-family: Quanta Grotesk Pro;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const NavRightSideDiv = styled.div`
  display: flex;
  background-color: ${(props) => (props.bgcolor === "gray" ? "#FAFAFA" : "#E5E5E5")};
  border: none;
  width: 12.75rem;
  margin-right: 2.9375rem;
  align-items: start;
`
const AboutBtn =styled.button`
  display: flex;
  background-color: ${(props) => (props.bgcolor === "gray" ? "#FAFAFA" : "#E5E5E5")};
  border: none;
  padding: 0;
  margin: 0;

  color: #504F4F;

  font-family: Work Sans;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const DashboardBtn = styled.button`
  display: flex;
  background-color: ${(props) => (props.bgcolor === "gray" ? "#FAFAFA" : "#E5E5E5")};
  border: none;
  padding: 0;
  margin: 0;
  margin-left: 2.5625rem;

  color: #FF3D00;

  font-family: Work Sans;
  font-size: 0.875rem;
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


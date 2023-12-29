import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
<<<<<<< HEAD
  padding-top: 1.4375rem;
  flex-shrink: 0;
  background: ${(props) => (props.bgcolor === 1 ? "#E5E5E5" : "#FAFAFA")};
  justify-content: space-between;
  align-items: start;

  & button {
    background: ${(props) => (props.bgcolor === 1 ? "#E5E5E5" : "#FAFAFA")};
  }

  & div {
    background: ${(props) => (props.bgcolor === 1 ? "#E5E5E5" : "#FAFAFA")};
  }
=======
  padding-top: 23px;
  flex-shrink: 0;
  background: #FAFAFA;
  justify-content: space-between;
  align-items: start;
>>>>>>> main
`;

const LogoBtn =styled.button`
  color: #FF3D00;
  padding: 0;
  margin: 0;
<<<<<<< HEAD
  margin-left: 2.9375rem;
  border: none;
=======
  margin-left: 47px;
  border: none;
  background-color: #FAFAFA;
>>>>>>> main
 
  font-family: Quanta Grotesk Pro;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const NavRightSideDiv = styled.div`
  display: flex;
<<<<<<< HEAD
  border: none;
  width: 12.75rem;
  margin-right: 2.9375rem;
=======
  background-color: #FAFAFA;
  border: none;
  width: 204px;
  margin-right: 47px;
>>>>>>> main
  align-items: start;
`
const AboutBtn =styled.button`
  display: flex;
<<<<<<< HEAD
=======
  background-color: #FAFAFA;
>>>>>>> main
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
<<<<<<< HEAD
  border: none;
  padding: 0;
  margin: 0;
  margin-left: 2.5625rem;
=======
  background-color: #FAFAFA;
  border: none;
  padding: 0;
  margin: 0;
  margin-left: 41px;
>>>>>>> main

  color: #FF3D00;

  font-family: Work Sans;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const Header = (props) => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
           <Navigation bgcolor={props.color}>
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


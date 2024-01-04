import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import HomeTopImage from "../../../Assets/img/HomeTopImage.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const FistScreenDiv =styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-top:15.63rem;
`;

const HomeTopImageDiv = styled.div`
  display: flex;
  position: absolute;
  width: 66.5rem;
    height: 60.70681rem;
    flex-shrink: 0;
  background-image: url(${HomeTopImage});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: -1;
  top: -10%;
  left: 55%;
  display: flex;
`;

const FirstHome = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header backcolor={"transparent"}></Header>
                <FistScreenDiv>
                    <HomeTopImageDiv/>
                    <div>돈도 지키고<br></br>우정도 지키고 싶다면?</div>
                    <div>MoneyGlove!</div>
                </FistScreenDiv>
            </Container>
        </ThemeProvider>
    );
};

export default FirstHome;

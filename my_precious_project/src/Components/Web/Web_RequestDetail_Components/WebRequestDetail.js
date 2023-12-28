import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import LeftSide from './LeftSide.js';
import RightSide from './RightSide.js';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  align-items: center;
  background:  #E5E5E5; 
`;

const Div =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

`;

function WebRequestDetail() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header bgColor="gray"/>
                <Div>
                    <LeftSide/>
                    <RightSide/>
                </Div>
            </Container>
        </ThemeProvider>
    );
}

export default WebRequestDetail;

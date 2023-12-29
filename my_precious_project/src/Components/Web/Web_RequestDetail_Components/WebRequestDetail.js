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
  width: 100%;
  align-items: center;
  background:  #E5E5E5; 
  overflow: hidden;
`;

const Div =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: center;

`;

const Test = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

function WebRequestDetail() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header color={1}/>
                <Div>
                    <LeftSide/>
                    <RightSide/>
                </Div>
            </Container>
        </ThemeProvider>
    );
}

export default WebRequestDetail;

import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DisplayFriend from './DisplayFriend.js';

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


function ManageFriendList() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <DisplayFriend/>
            </Container>
        </ThemeProvider>
    );
}

export default ManageFriendList;

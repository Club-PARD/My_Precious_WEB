import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DisplayFriend from './DisplayFriend.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 19.9375rem;
  width: 20.225rem;
  align-items: center;
  background:  #F1F1F1; 
  overflow: auto;
`;


function ManageFriendList() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
            </Container>
        </ThemeProvider>
    );
}

export default ManageFriendList;

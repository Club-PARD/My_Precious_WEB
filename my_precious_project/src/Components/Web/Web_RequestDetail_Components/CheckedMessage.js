import React, { useState, useCallback, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
/****  MUI Libraries  *****/
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';
import { UserDataContext } from '../../../contexts/userContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 31.1875rem;
    height: 22.25rem;
    flex-shrink: 0;
    border-radius:  0.625rem;
    background: #FFF;
    box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
    margin-left: 3.625rem;
    align-items: center;


`;


// 글읽기 페이지에서 채권자 입장(로그인 상태-> 빌려준 상태)
function CheckedMessage() {
    const theme = useTheme();
    const [userData, setUserData] = useContext(UserDataContext);
    const uid = userData.uid;


    return (
        <ThemeProvider theme={theme}>
            <Container>
                하이
            </Container>
        </ThemeProvider>
    );
}

export default CheckedMessage;
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import Header from '../Layout_Components/Mypage_header.js';
import ManageSummary from './ManageSummary.js';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
//npm install --save react-copy-to-clipboard
import hamburgerbar from "../../../Assets/img/hamburgerbar.svg";
import Back from "../../../Assets/img/Back.svg";
import ManageFriendList from './ManageFriendList.js';

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

const ContentsDiv =styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 3.96rem;
`;

const TitleDiv =styled.div`
    display: flex;
    color: #3E3E3E;
    font-family: Pretendard;
    font-size: 2rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const LinkCopyDiv =styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 44.5rem;
    justify-content: end;
    padding-bottom: 1.06rem;
`;

const CopyText =styled.div`
    display: flex;
    color: #6D6D6D;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem; 
    margin-right: 1rem;
    cursor: pointer;
`;

const ImageHamburgerButton = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const BackButton =styled.button`
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer; 
    left: -57%;
    top:13%;
`;

function WebManageRequest() {
    const theme = useTheme();
    const navigate = useNavigate();

    const HandleBackClick  = () =>{
        navigate("/dashboard");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header color={1}/>
                <ContentsDiv>
                    <BackButton onClick={HandleBackClick}>
                        <img src={Back} alt="뒤로가기 버튼튼" />
                    </BackButton>
                    <TitleDiv>어머니 수술비용</TitleDiv>
                    <LinkCopyDiv>
                        <CopyToClipboard
                            text="링크 만들어줘요잉"
                            onCopy={() => alert("클립보드에 복사되었습니다.")}>
                            <CopyText>링크복사</CopyText>
                        </CopyToClipboard>
                        <ImageHamburgerButton>
                            <img src={hamburgerbar} alt="햄버거바 아이콘" />
                        </ImageHamburgerButton>
                    </LinkCopyDiv>
                    <ManageSummary/>
                    <ManageFriendList/>
                </ContentsDiv>
            </Container>
        </ThemeProvider>
    );
}

export default WebManageRequest;

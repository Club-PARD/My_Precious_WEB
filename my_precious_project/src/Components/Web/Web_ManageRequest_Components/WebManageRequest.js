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
import Copy from "../../../Assets/img/Copy.svg";
import Show from "../../../Assets/img/Show.png";
import ManageBottom from './ManageBottom.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  background:  #F1F1F1; 
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
    display: flex;
    flex-direction: row;
    width: 51.875rem;
    justify-content: end;
    padding-bottom: 1.06rem;
    position: relative;
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
    margin-right: 2rem;
    padding-left: 0.5rem;
    align-items: center;
    cursor: pointer;
`;

const BackBtn = styled.button`
    position: absolute;
    background-image:url(${Back});
    background-repeat:no-repeat;
    background-size: contain;
    top: -90%;
    left: -6%;
    z-index: 1;
    display: flex;
    width: 1rem;
    height: 2.375rem;
    flex-shrink: 0;
    border: none;
    background-color: #F1F1F1;
    cursor: pointer;
`;

const ShowMoreBtn =styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 0.1875rem;
    border: 1px solid #FF6A3B;
    width: 10.3125rem;
    height: 1.8125rem;
    flex-shrink: 0;
    background-color: #F1F1F1;
    gap: 0.38rem;

    color: #FF6A3B;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem; /* 142.857% */
    cursor: pointer;
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
                <Header />
                <ContentsDiv>
                    <TitleDiv>어머니 수술비용</TitleDiv>
                        <LinkCopyDiv>
                            <BackBtn Btn onClick={HandleBackClick}/>
                            <img src={Copy} alt="클립보드 아이콘"/>
                            <CopyToClipboard
                                text="링크 만들어줘요잉"
                                onCopy={() => alert("클립보드에 복사되었습니다.")}>
                                <CopyText>링크복사</CopyText>
                            </CopyToClipboard>
                            <ShowMoreBtn>
                            <img src={Show} alt="전체보기 아이콘"/> 내가 쓴 글 전체보기
                            </ShowMoreBtn>
                        </LinkCopyDiv>
                    <ManageSummary/>
                    <ManageBottom/>
                </ContentsDiv>
            </Container>
        </ThemeProvider>
    );
}

export default WebManageRequest;

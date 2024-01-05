import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import MGLogo from '../../../Assets/img/MGLogo.svg';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate(`/dashboard/`);
    };

    const navigateToTeamNotion =(url) =>{
        window.open(url, "_brank", "noopener, noreferrer");
    };

    return (
        <ThemeProvider theme={theme}>
            <Navigation>
                <LogoImg src={MGLogo} alt="로고이미지"></LogoImg>
                <NavRightSideDiv>
                    <AboutBtn onClick={()=>navigateToTeamNotion("https://dongwon0507.notion.site/2579c73b82614450ad676fe12f491ec9?pvs=4")}>ABOUT US</AboutBtn>
                    <DashboardBtn onClick={navigateToDashboard}>DASHBOARD</DashboardBtn>
                </NavRightSideDiv>
            </Navigation>
        </ThemeProvider>
    );
};

const Navigation = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 80%;
    height: 4.1825rem;
    /* padding-top: 33px;
  padding-bottom: 75px; */
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    /* left: 0; */
    padding-top: 1.94rem;
    z-index: 1;

    & button {
        background-color: transparent;
    }

    & div {
        background-color: transparent;
    }
    background-color: transparent;
`;

const LogoImg = styled.img`
    width: 135px;
    height: 46.5px;
`;

const NavRightSideDiv = styled.div`
    display: flex;
    border: none;
    width: 12.75rem;
`;
const AboutBtn = styled.button`
    display: flex;
    border: none;
    padding: 0;
    margin: 0;
    margin-left: 1rem;
    color: var(--grey-Grey_5, #696666);
    font-family: Work Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
`;

const DashboardBtn = styled.button`
    display: flex;
    border: none;
    padding: 0;
    margin: 0;
    margin-left: 2.5625rem;
    color: #696666;
    font-family: Work Sans;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
`;

export default HomeHeader;

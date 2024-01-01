import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DisplayFriend from './DisplayFriend.js';
import SummaryFriend from './SummaryFriend.js';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 51.875rem;
  padding-top: 3.31rem;
`;

const ColumnDiv =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

const DisplayFriends =styled.div`
    display: flex;
    color: #3E3E3E;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 1.19rem;
`;

const FriendsCountDiv= styled.div`
    display: flex;
    color: #8F8F8F;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    align-items: end;
    padding-bottom: 0.87rem;
`;

const FriendsCountText = styled.div`
    display: flex;
    color: #FF3D00;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const LeftNoDiv =styled.div`
    display: flex;
    width: 31.1875rem;
    height: 19.9375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #F0F0F0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: var(--grey-Grey_3, #B3B3B3);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */
    justify-content: center;
    align-items: center;
`;

const RightNoDiv = styled.div`
    display: flex;
    width: 19.625rem;
    height: 19.9375rem;
    border-radius: 0.625rem;
    background: #F0F0F0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    flex-shrink: 0;
    color: var(--grey-Grey_3, #B3B3B3);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */
    justify-content: center;
    align-items: center;
`;

function ManageBottom() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ColumnDiv style={{width: "31.1875rem", marginRight: "0.75rem"}}>
                    <DisplayFriends>도와준 친구들</DisplayFriends>
                    <LeftNoDiv>아직 내역이 없어요.</LeftNoDiv>
                </ColumnDiv>
                <ColumnDiv style={{width:"20.225rem"}}>
                    <FriendsCountDiv>
                        <FriendsCountText>14명</FriendsCountText>의 친구들이 도와주고 있어요 
                    </FriendsCountDiv>
                    <RightNoDiv>아직 내역이 없어요.</RightNoDiv>
                </ColumnDiv>
                <SummaryFriend/>
            </Container>
        </ThemeProvider>
    );
}

export default ManageBottom;

import React, { useState, useCallback, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import axios from 'axios';
import { UserDataContext } from '../../../contexts/userContext';
import CheckBox from '../../../Assets/img/CheckBox.svg';
import SentToEmailModal from './Modal/SentToEmailModal.js';


// 글읽기 페이지에서 채권자 입장(로그인 상태-> 빌려준 상태)
function CheckedMessage() {
    const theme = useTheme();
    const [userData, setUserData] = useContext(UserDataContext);
    const uid = userData.uid;

    //모달에 보낼 props값 - 재촉편지
    const Modal_Chaseup ={
        function : "재촉편지",
        subHeader: "과격한 재촉 편지는 법적 문제가 될 수 있으니 주의해주세요.",
        longplacehorder: "기간내에 돈을 돌려받지 못했다면, 재촉편지를 작성해 볼 수 있습니다. 과격한 재촉은 오히려 상대방이 돈을 갚기에 반감을 살 수 있습니다. 상대방이 돈을 못 갚고 있는 상황에 대해 이해하려고 노력해보세요. 그리고 이후에 지금 돈을 돌려 받아야 하는 이유에 대해 설명하세요. 우정을 지키기 위해 따뜻한 말로 작성해주세요."
    }

    //모달에 보낼 props값 - 감사편지
    const Modal_ThankU ={
        function : "감사편지",
        subHeader: "당신이 힘들 때 도움 준 친구에게 감사한 마음을 전해보아요.",
        longplacehorder: "머글님께서 힘들 때 도움을 준 친구에게 감사함을 전해보세요. MoneyGlove를 통해 돈을 빌려준 친구는 이자율도 없으며 금전적 이득을 위함이 아닌, 오로지 머글님을 걱정하는 마음을 가지고 도와주는 우정이 넘치는 친구입니다. 금액은 중요하지 않습니다. 자신의 상황에 최대의 금액을 보내준 친구에게 감사함을 전해주세요."
    }

    //1. 서버에서 빌려준 메시지 get
    //2. 서버로 체크박스 값 patch or post

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentsDiv>
                    <HeaderDiv>
                        <Name>김현지 님</Name>
                        <BorrowMoney>1,000,000 원</BorrowMoney>
                    </HeaderDiv>
                    <DetailDiv>
                        <GrayText>응원메시지</GrayText>
                        <DisplayBorrowDiv>
                            <DisplayBorrowText>머글이 많이 힘들겠다... 화이팅하고 얼마 안되지만 도움이 되길 바라!!
                            </DisplayBorrowText>
                        </DisplayBorrowDiv>
                    </DetailDiv>
                    <DetailDiv style={{marginTop: "0.56rem"}}>
                        <GrayText>빌려준 금액</GrayText>
                        <DisplayBorderText>100,000 원</DisplayBorderText>
                    </DetailDiv>
                    <DetailDiv style={{marginTop: "0.56rem"}}>
                        <GrayText>돌려받을 계좌</GrayText>
                        <DisplayBorderText>수협은행   001096172521</DisplayBorderText>
                    </DetailDiv>
                </ContentsDiv>
                <Div>
                    <CheckBtn>갚은 것을 확인했어요</CheckBtn>
                    <SentToEmailModal props= {Modal_Chaseup}/>
                </Div>
            </Container>
        </ThemeProvider>
    );
}

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

const ContentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 26.435rem;
    padding-top: 1.12rem;

`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2.2rem;
`;

const Name = styled.div`
    display: flex;
    color: var(--grey-grey-6-secondary, #504F4F);
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1875rem; /* 95% */
`;

const BorrowMoney =styled.div`
    display: flex;
    color: #696969;
    text-align: right;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */

`;

const DetailDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`;

const GrayText =styled.div`
    display: flex;
    color: var(--grey-Grey_4, #8E8E8E);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 278.571% */

`;

const DisplayBorrowDiv = styled.div`
    display: flex;
    width: 20.5rem;
    height: 3.5rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid var(--grey-Grey_2, #D9D9D9);
    //background: #FAFAFA;
    overflow: auto;
`;

const DisplayBorrowText =styled.div`
    display: flex;
    color: var(--grey-Grey_5, #696666);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    margin: 0.5rem 0.9rem 0.5rem 0.9rem;
    width: 100%;

`;

const DisplayBorderText =styled.div`
    display: flex;
    width: 19.56rem;
    height: 2.4375rem;
    border-radius: 0.625rem;
    border: 1px solid var(--grey-Grey_2, #D9D9D9);

    flex-shrink: 0;
    color: #696969;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem;
    justify-content: end;
    padding-right: 0.94rem;
`;

const Div =styled.div`
    display: flex;
    flex-direction: row;
    width: 30rem;
    justify-content: space-between;
    padding-top: 1.94rem;
    align-items:center;
    width: 23.5rem;
`;


const CheckBtn =styled.button  `
    display: flex;
    width: 10.9375rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    background:  #FF3D00;
    border: none;
    align-items: center;
    justify-content: center;
    color: #FFFCFB;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem;
    padding: 0;
    cursor: pointer;
`;

export default CheckedMessage;
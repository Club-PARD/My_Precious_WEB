import React, { useState,useEffect } from 'react';
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
import axios from 'axios';

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

const boardId =39; //임시로 정해둔 값

function WebManageRequest() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [mangeData, setManageData] = useState({
        title: "",
        borrowMoney: 0,
        payDate: "",
        situation: "",
        payWay: "", 
        bank: "", 
        bankAccount: "",
        boardStatus: "",
        name: "", 
        debts: "", 
        dday: 0,
        lendMoneyCount: 0, // 빌린 친구 수
        totalLendmoney:0 , //빌린 돈 총합
        formatted_date:"" //형식이 맞춰진 지불날짜

    });

    useEffect(() => {
        // Fetch data when the component is mounted
        axios
          .get(`http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/boards/${boardId}`)
          .then((response) => {
            const title = response.data.data.title;
            const borrowMoney = response.data.data.borrowMoney;
            const payDate = response.data.data.payDate;
            const situation = response.data.data.situation;
            const payWay = response.data.data.payWay;
            const bank = response.data.data.bank;
            const bankAccount = response.data.data.user.bankAccount;
            const boardStatus = response.data.data.boardStatus;
            const name = response.data.data.user.name;
            const debts = response.data.data.debts;
            const dday = response.data.data.dday;

            console.log(response.data);

            //빌려준 친구 수 가져옴
            const lendMoneyCount =parseFloat(debts.length);
            
            // 빌린돈 더하기
            const maplend =debts.map((value, index) =>{
                return parseFloat(value.lendMoney);
            });
            const totalLendmoney = maplend.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            //날짜처리
            const formatted_date =payDate.substring(0, 4) + '년 ' + payDate.substring(4, 6) + '월 ' + payDate.substring(6)+'일';

            //숫자처리
            const ChangeBorrowMoney =parseFloat(borrowMoney);

            setManageData({
                title: title,
                borrowMoney: ChangeBorrowMoney,
                payDate: payDate,
                situation: situation,
                payWay: payWay,
                bank: bank,
                bankAccount: bankAccount,
                boardStatus:boardStatus,
                name:name,
                debts:debts,
                dday:dday,
                lendMoneyCount:lendMoneyCount,
                totalLendmoney:totalLendmoney,
                formatted_date:formatted_date,
            });
          })
          .catch((error) => {
            console.error("데이터 전송 중 오류 발생: ", error);
            // 오류를 처리합니다.
          });
    }, []);

    const HandleBackClick  = () =>{
        navigate("/dashboard");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header />
                <ContentsDiv>
                    <TitleDiv>{mangeData.title}</TitleDiv>
                        <LinkCopyDiv>
                            <BackBtn onClick={HandleBackClick}/>
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
                    <ManageSummary mangeData={mangeData} setManageData={setManageData}/>
                    <ManageBottom boardId={boardId} mangeData={mangeData}/>
                </ContentsDiv>
            </Container>
        </ThemeProvider>
    );
}

export default WebManageRequest;

import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DisplayFriend from './DisplayFriend.js';
import SummaryFriend from './SummaryFriend.js';
import axios from 'axios';
import ManageFriendList from './ManageFriendList.js';

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

function ManageBottom({boardId,mangeData}) {
    const theme = useTheme();
    const [getdebtidShow, setGetdebtidShow]= useState("");
    const debtId =parseFloat(getdebtidShow);
    
    const [displayData, setDisplayData] = useState({
        lendMoney: "",
        message: "",
        bank: "",
        bankAccount: "",
        debtStatus: "", 
        repaymentStatus: "", 
        name: "",
        gmailId: "", 

    });

    useEffect(() => {
        if (!getdebtidShow) {
            return; // 값이 없을 경우 요청을 보내지 않습니다.
        }
        axios
        .get(`http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/debts/${debtId}`)
        .then((response) => {
            console.log("굿잡: ", response.data.data);

            const lendMoney = response.data.data.lendMoney;
            const message = response.data.data.message;
            const bank = response.data.data.bank;
            const debtStatus = response.data.data.debtStatus;
            const repaymentStatus = response.data.data.repaymentStatus;
            const name = response.data.data.user.name;
            const gmailId =response.data.data.user.gmailId;

            setDisplayData({
                ...displayData,
                lendMoney:lendMoney,
                message:message,
                bank:bank,
                debtStatus: debtStatus,
                repaymentStatus:repaymentStatus,
                name : name,
                gmailId : gmailId,
            });

            console.log("...", getdebtidShow);

        })
        .catch((error) => {
        console.error("데이터 전송 중 오류 발생: ", error);
        // 오류를 처리합니다.
        });
    }, [getdebtidShow]); 

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ColumnDiv style={{width: "31.1875rem", marginRight: "0.75rem"}}>
                    <DisplayFriends>도와준 친구들</DisplayFriends>
                    {mangeData.lendMoneyCount ===0 ? (
                        <LeftNoDiv>아직 내역이 없어요.</LeftNoDiv>
                    ) : (
                        <DisplayFriend displayData={displayData} debtId={debtId} />
                    )}

                </ColumnDiv>
                <ColumnDiv style={{width:"20.225rem"}}>
                    <FriendsCountDiv>
                        <FriendsCountText>{mangeData.lendMoneyCount}명</FriendsCountText>의 친구들이 도와주고 있어요 
                    </FriendsCountDiv>

                    {mangeData.lendMoneyCount === 0 ?(
                    <RightNoDiv>아직 내역이 없어요.</RightNoDiv> 
                    ) :(
                        <ManageFriendList boardId={boardId} setGetdebtidShow={setGetdebtidShow}/>
                    )}

                </ColumnDiv>
            </Container>
        </ThemeProvider>
    );
}

export default ManageBottom;

import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import axios from 'axios';
import { useUserData } from '../../../contexts/userContext';
import CheckBox from '../../../Assets/img/CheckBox.svg';
import SentToEmailModal from './Modal/SentToEmailModal.js';

// 글읽기 페이지에서 채권자 입장(로그인 상태-> 빌려준 상태)
function CheckedMessage({ debtIdgnum }) {
    const theme = useTheme();
    const [userData, setUserData] = useUserData();
    const uid = userData.uid;
    const debtId = debtIdgnum;

    //모달에 보낼 props값 - 재촉편지
    const Modal_Chaseup = {
        function: '재촉편지',
        subHeader: '과격한 재촉 편지는 법적 문제가 될 수 있으니 주의해주세요.',
        longplacehorder:
            '기간내에 돈을 돌려받지 못했다면, 재촉편지를 작성해 볼 수 있습니다. 과격한 재촉은 오히려 상대방이 돈을 갚기에 반감을 살 수 있습니다. 상대방이 돈을 못 갚고 있는 상황에 대해 이해하려고 노력해보세요. 그리고 이후에 지금 돈을 돌려 받아야 하는 이유에 대해 설명하세요. 우정을 지키기 위해 따뜻한 말로 작성해주세요.',
        sendToEmail: '',
    };

    const [detailData, setDetailData] = useState({
        lendMoney: '',
        message: '',
        bank: '',
        bankAccount: '',
        debtStatus: '', //돈 갚은 사람 확인
        repaymentStatus: '', //돈 빌려준 사람 확인
        name: '',
    });

    useEffect(() => {
        // Fetch data when the component is mounted
        axios
            .get(
                `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/debts/${debtId}`,
                debtId
            )
            .then((response) => {
                const lendMoney = response.data.data.lendMoney;
                const message = response.data.data.message;
                const bank = response.data.data.bank;
                const bankAccount = response.data.data.bankAccount;
                const debtStatus = response.data.data.debtStatus;
                const repaymentStatus = response.data.data.repaymentStatus;
                const name = response.data.data.user.name;
                console.log(debtStatus);

                setDetailData({
                    lendMoney: lendMoney,
                    message: message,
                    bank: bank,
                    bankAccount: bankAccount,
                    debtStatus: debtStatus,
                    repaymentStatus: repaymentStatus,
                    name: name,
                });
            })
            .catch((error) => {
                console.error('데이터 전송 중 오류 발생: ', error);
                // 오류를 처리합니다.
            });
    }, []);

    const CheckDebtStatusSubmit = (event) => {
        // 기본 양식 제출 동작 방지
        event.preventDefault();

        setDetailData((detailData) => ({
            ...detailData,
            repaymentStatus: debtId,
        }));

        axios
            .patch(
                `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/debts/check-confirmed-boxes/${debtId}`,
                { repaymentStatus: debtId }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('데이터 전송 중 오류 발생: ', error);
            });
    };

    //빌려준 돈 숫자에서 문자 -> 컴마 추가
    var receiveNumber = parseFloat(detailData.lendMoney);
    var formattedNumber = receiveNumber.toLocaleString();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentsDiv>
                    <HeaderDiv>
                        <Name>{detailData.name} 님</Name>
                        <BorrowMoney>{formattedNumber} 원</BorrowMoney>
                    </HeaderDiv>
                    <DetailDiv>
                        <GrayText>응원메시지</GrayText>
                        <DisplayBorrowDiv>
                            <DisplayBorrowText>{detailData.message}</DisplayBorrowText>
                        </DisplayBorrowDiv>
                    </DetailDiv>
                    <DetailDiv style={{ marginTop: '0.56rem' }}>
                        <GrayText>빌려준 금액</GrayText>
                        <DisplayBorderText>{formattedNumber} 원</DisplayBorderText>
                    </DetailDiv>
                    <DetailDiv style={{ marginTop: '0.56rem' }}>
                        <GrayText>돌려받을 계좌</GrayText>
                        <DisplayBorderText>
                            {detailData.bank} {detailData.bankAccount}
                        </DisplayBorderText>
                    </DetailDiv>
                </ContentsDiv>
                <Div>
                    <CheckBtn onClick={CheckDebtStatusSubmit}>갚은 것을 확인했어요</CheckBtn>
                    <SentToEmailModal props={Modal_Chaseup} />
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
    border-radius: 0.625rem;
    background: #fff;
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
    color: var(--grey-grey-6-secondary, #504f4f);
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1875rem; /* 95% */
`;

const BorrowMoney = styled.div`
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
    align-items: center;
    justify-content: space-between;
`;

const GrayText = styled.div`
    display: flex;
    color: var(--grey-Grey_4, #8e8e8e);
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
    border: 1px solid var(--grey-Grey_2, #d9d9d9);
    //background: #FAFAFA;
    overflow: auto;
`;

const DisplayBorrowText = styled.div`
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

const DisplayBorderText = styled.div`
    display: flex;
    width: 19.56rem;
    height: 2.4375rem;
    border-radius: 0.625rem;
    border: 1px solid var(--grey-Grey_2, #d9d9d9);

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

const Div = styled.div`
    display: flex;
    flex-direction: row;
    width: 30rem;
    justify-content: space-between;
    padding-top: 1.94rem;
    align-items: center;
    width: 23.5rem;
`;

const CheckBtn = styled.button`
    display: flex;
    width: 10.9375rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    background: #ff3d00;
    border: none;
    align-items: center;
    justify-content: center;
    color: #fffcfb;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem;
    padding: 0;
    cursor: pointer;
`;

export default CheckedMessage;
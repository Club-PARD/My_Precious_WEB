import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import LineProgress from './LineProgress.js';
import Talk from '../../../Assets/img/Talk.svg';
import CheckBox from '../../../Assets/img/CheckBox.svg';

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 46.1875rem;
    height: 47.8125rem;
    background: #FAFAFA;
    box-shadow: 0px  0.25rem  0.25rem 0px rgba(0, 0, 0, 0.25);
    margin-top: 2.6rem;
`;

const TotalColletMoney =styled.div`
    color: #3E3E3E;

    font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-top: 3.0625rem;
    padding-left: 1.375rem;
`;

const Image = styled.div`
    position: absolute;
    width: 10.375rem;
    height: 4.4375rem;
    background-image:url(${Talk});
    background-repeat:no-repeat;
    background-size: contain;
    top: 1%;
    left: 45%;
    z-index: 1;
    display: flex;
    justify-content: center;
    //align-items: center;
`;

const ImageText = styled.div`
    color: #5B5B5B;

    font-family: Pretendard;
    font-size:  0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 9.375rem;
    //height: 2.125rem;
    padding-top: 0.75rem;
    padding-left: 0.3rem;
`;

const StyleLineProgress =styled.div`
    margin-left: 1.375rem;
    margin-top:  0.75rem;
`;
const Row =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    padding-right: 1.625rem;
`;

const Circle =styled.div`
    width: 0.4375rem;
    height: 0.4375rem;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;
    background-color: #FC511C; 
`;

const ReceivedMoney =styled.div`
    color: #5B5B5B;
    padding-left: 0.375rem;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const DisplayBoxDiv =styled.div`
    display: flex;
    flex-direction: column;
    width:  42.375rem;
    height: 29.1875rem;
    //border: 0.0625rem solid red;
    margin-left:  2.375rem;
    margin-top: 1.64rem;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
`;

const DarkGrayText = styled.div`
    display: flex;
    color: #6A6A6A;

    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem;
    margin-right: 2.9375rem;
`;

const DisplayDataDiv = styled.div`
    display: flex;
    width: 37.5625rem;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius:  0.5rem;
    border: 0.0625rem solid #E0E0E0;
    background: #FAFAFA;
    overflow: auto;
`;

const DisplayDataText =styled.div`
    display: flex;
    color: #6A6A6A;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem;
    margin: 0.875rem 2.25rem 0.875rem 1.3125rem;
    //align-items: center;
    //overflow: auto;

`;

const DisplayDataTitleDiv = styled(DisplayDataDiv)`
    height: 3.1875rem;
    
`;

const DisplayDataTitleText = styled(DisplayDataText)`
    display: flex;
    //margin: 0.31rem 2.25rem 0.31rem 1.3125rem;
    //margin: 0rem 2.25rem 0rem 1.3125rem;
    width: 100%;
`;

const DisplayDataReasonDiv =styled(DisplayDataDiv)`
    height: 7.9375rem;
`;

const DisplayDataReasonText =styled(DisplayDataText)`
    color: #696666;
    font-weight: 500;
    //height: 100%;
    width: 100%;
`;

const DisplayDataPlanDiv =styled(DisplayDataDiv)`
    height: 5.3125rem;
    //overflow-y: auto; 
`;

const DisplayDataPlanText = styled(DisplayDataText)`
    //height: 100%;
    color: #696969;
    font-weight: 500;
    width: 100%;
`;

const DisplayDataTotalDiv =styled(DisplayDataDiv)`
    height: 2.4375rem;
    justify-content: end;
    align-items: center;
`;
const DisplayDataTotalText =styled.div`
    color: #696969;
    text-align: right;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 243.75% */
    padding-right: 2.69rem;
`;

const SignDiv =styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.25rem;
    padding-left: 4rem;
    padding-top: 2.19rem;
    align-items: center;
`;

const SignText = styled.div`
    display: flex;
    color: #A5A5A5;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 243.75% */
`;

function LeftSide() {
    const theme = useTheme();

    const userData = {
        total: 5000000, //프로그레스바 전체(흰색부분)
        receive: 4008000, //프로그레스바 채워진 부분(주황색)
        title: "어머님 수술비가 위급합니다. 조금이라도 도와주세요..",
        reason: "저희 어머니께서 지난주에 갑작스럽게 쓰러지셨습니다. 병명은 암이라고 하네요. 수술비용이 당장 500만 원이 필요하며, 추후에는 입원비용으로 계속해서 돈이 나갑니다. 시중에는 제가 모아둔 돈 300만 원 뿐이라.. 여러분의 도움이 필요합니다. 시간은 더디 걸리더라도 꼭 갚을 예정이며, 감사한 마음들 모두 기억하여 배로 갚으며 갈겠습니다. 작은 도움이라 여기며 지나치지 말아주시고, 조금이라도 보템 주시면 정말 감사하겠습니다. 후원이 아니라 제가 꼭 갚을 약속이니 안심하고 고려해주세요!..",
        plan: "현재 아르바이트를 통해 지속적으로 돈을 벌고 있습니다. 생활비 빼고 조금씩이라도 여러분께 갚을 수 있습니다. 빠르면 3달 이내로, 늦으면 5달 정도로 갚을 계획입니다. 큰 금액을 빌려주시는 분께는 분할로 꾸준하게 갚겠습니다. 정말 감사해요. :)",
        date: "2024년 02월 24일",
        bank: "농협은행",
        account:"352-1111-1111-11",
        checkBox: true,
        helpFriendCount: 2
    };

    //받은 돈 숫자에서 문자 -> 컴마 추가
    var receiveNumber = userData.receive;
    var formattedNumber = receiveNumber.toLocaleString();
    //필요한 돈 숫자에서 문자 -> 컴마 추가
    var totaleNumber = userData.total;
    var formattedNumber2 = totaleNumber.toLocaleString();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TotalColletMoney>현재까지 모인 금액</TotalColletMoney> 
                <Image> 
                    <ImageText>
                    현재까지 {userData.helpFriendCount}명의 친구가 함께 도와주고 있어요.
                    </ImageText>
                </Image>
                <StyleLineProgress>
                    <LineProgress total={userData.total} receive={userData.receive}/>
                </StyleLineProgress>
                <Row>
                    <Circle></Circle>
                    <ReceivedMoney>{formattedNumber}원 모였어요</ReceivedMoney>
                </Row>

                <DisplayBoxDiv>
                    <Line>
                        <DarkGrayText>제목</DarkGrayText>
                        <DisplayDataTitleDiv >
                            <DisplayDataTitleText>{userData.title}</DisplayDataTitleText>
                        </DisplayDataTitleDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem"}}>
                        <DarkGrayText>사유</DarkGrayText>
                        <DisplayDataReasonDiv>
                            <DisplayDataReasonText>{userData.reason}</DisplayDataReasonText>
                        </DisplayDataReasonDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem"}}>
                        <DarkGrayText style={{marginRight:"0.8rem"}}>상환 계획</DarkGrayText>
                        <DisplayDataPlanDiv>
                            <DisplayDataPlanText >{userData.plan}</DisplayDataPlanText>
                        </DisplayDataPlanDiv>
                    </Line>
                    <Line style={{marginTop:"3.19rem"}}>
                        <DarkGrayText style={{marginRight:"0.8rem"}}>필요 금액</DarkGrayText>
                        <DisplayDataTotalDiv>
                            <DisplayDataTotalText>{formattedNumber2} 원</DisplayDataTotalText>
                        </DisplayDataTotalDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem"}}>
                        <DarkGrayText style={{marginRight:"0.8rem"}}>갚을 날짜</DarkGrayText>
                        <DisplayDataTotalDiv>
                            <DisplayDataTotalText>{userData.date} </DisplayDataTotalText>
                        </DisplayDataTotalDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem"}}>
                        <DarkGrayText style={{marginRight:"0.8rem"}}>갚을 날짜</DarkGrayText>
                        <DisplayDataTotalDiv>
                            <DisplayDataTotalText>{userData.bank} {userData.account} </DisplayDataTotalText>
                        </DisplayDataTotalDiv>
                    </Line>
                </DisplayBoxDiv>
                <SignDiv>
                    <SignText>서약</SignText>
                    <SignText>나 김현지는 2024년 02월 24일까지 돈을 갚을 것을 약속합니다.  감사합니다.</SignText>
                    <img src={CheckBox} alt='체크박스 이미지'></img>
                </SignDiv>
            </Container>
        </ThemeProvider>
    );
}

export default LeftSide;

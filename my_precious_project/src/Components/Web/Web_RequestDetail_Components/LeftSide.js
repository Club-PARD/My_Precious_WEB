import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import LineProgress from './LineProgress.js';
import Talk from '../../../Assets/img/Talk.svg';
import CheckBox from '../../../Assets/img/CheckBox.svg';
import axios from 'axios';
import Character from '../../../Assets/img/Character.png';


const boardId = 1;

function LeftSide({under100, setUnder100, updateLeftSide}) {
    const theme = useTheme();

    const [detailData, setDetailData] = useState({
        total: 10000, //프로그레스바 전체(흰색부분)
        receive: 1000, //프로그레스바 채워진 부분(주황색)
        title: "",
        reason: "",
        plan: "",
        date: "",
        bank: "",
        account:"",
        name:"" ,
        lendMoneyCount: 0 , // 빌려준 친구의 수
        
    });

    useEffect(() => {
        //GET 요청 보내기
        axios
          .get(`http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/boards/${boardId}`)
          .then((response) => {
            //console.log("response: " + JSON.stringify(response.data.data));
    
            //서버에서 받은 데이터 추출
            const Title = response.data.data.title;
            const BorrowMoney = response.data.data.borrowMoney;
            const payDate =response.data.data.payDate;
            const situation =response.data.data.situation;
            const payWay =response.data.data.payWay;
            const bank =response.data.data.bank;
            const bankAccount = response.data.data.bankAccount;
            const name = response.data.data.user.name;
            const lendMoneydata = response.data.data.debts;

            //빌려준 친구 수 가져옴
            const lendMoneyCount =parseFloat(lendMoneydata.length);

            //console.log(lendMoneydata[1].lendMoney)
            
            // 빌린돈 더하기
            const maplend =lendMoneydata.map((value, index) =>{
                return parseFloat(value.lendMoney);
            });
            const totalLendmoney = maplend.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            //console.log("빌린돈 총합" , totalLendmoney)

            //날짜처리
            const formatted_date =payDate.substring(0, 4) + '년 ' + payDate.substring(4, 6) + '월 ' + payDate.substring(6)+'일';

            //숫자처리
            const ChangeBorrowMoney =parseFloat(BorrowMoney);

            setDetailData((detailData) => ({
              ...detailData,
              title: Title,
              total: ChangeBorrowMoney,
              date: formatted_date,
              reason: situation,
              plan :payWay,
              bank : bank,
              account : bankAccount,
              name:name,
              lendMoneyCount: lendMoneyCount,
              receive:totalLendmoney
            }));
          })
          .catch((error) => console.log("error: " + error));
      }, [updateLeftSide]);


    //받은 돈 숫자에서 문자 -> 컴마 추가
    var receiveNumber = detailData.receive;
    var formattedNumber = receiveNumber.toLocaleString();
    //필요한 돈 숫자에서 문자 -> 컴마 추가
    var totaleNumber = detailData.total;
    var formattedNumber2 = totaleNumber.toLocaleString();

    //모은 돈이 받길 원하는 돈을 넘었을 때 돈 빌려주기 작성 버튼 비활성화를 위한 상태 설정
    useEffect(() => {
        // total과 collect을 이용하여 퍼센트 계산
        const percent = (detailData.receive / detailData.total) * 100;
    
        // 100% 이상인 경우
        if (percent >= 100) {
          setUnder100(true);
        } else {
        setUnder100(false);
        }
      }, [detailData.total, detailData.receive]);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TotalColletMoney>현재까지 모인 금액</TotalColletMoney> 
                <ImageCharacter/>
                <Image> 
                    <ImageText>
                    현재까지 {detailData.lendMoneyCount}명의 친구가 함께 도와주고 있어요.
                    </ImageText>
                </Image>
                <StyleLineProgress>
                    <LineProgress total={parseFloat(detailData.total)} receive={parseFloat(detailData.receive)} />
                </StyleLineProgress>
                <Row>
                    <Circle></Circle>
                    <ReceivedMoney>{formattedNumber}원 모였어요</ReceivedMoney>
                </Row>

                <DisplayBoxDiv>
                    <Line style={{height: "3.1875rem"}}>
                        <DarkGrayText>제목</DarkGrayText>
                        <DisplayDataTitleDiv >
                            <DisplayDataTitleText>{detailData.title}</DisplayDataTitleText>
                        </DisplayDataTitleDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem", height: "7.9375rem"}}>
                        <DarkGrayText>사유</DarkGrayText>
                        <DisplayDataReasonDiv>
                            <DisplayDataReasonText>{detailData.reason}</DisplayDataReasonText>
                        </DisplayDataReasonDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem" ,height: "5.3125rem"}}>
                        <DarkGrayText style={{marginRight:"0.8rem"}}>상환 계획</DarkGrayText>
                        <DisplayDataPlanDiv>
                            <DisplayDataPlanText >{detailData.plan}</DisplayDataPlanText>
                        </DisplayDataPlanDiv>
                    </Line>
                    <Line style={{marginTop:"3.19rem"}}>
                        <DarkGrayText style={{ height: "2.4375rem"}}>필요 금액</DarkGrayText>
                        <DisplayDataTotalDiv>
                            <DisplayDataTotalText>{formattedNumber2} 원</DisplayDataTotalText>
                        </DisplayDataTotalDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem" , height: "2.4375rem"}}>
                        <DarkGrayText >갚을 날짜</DarkGrayText>
                        <DisplayDataTotalDiv>
                            <DisplayDataTotalText>{detailData.date} </DisplayDataTotalText>
                        </DisplayDataTotalDiv>
                    </Line>
                    <Line style={{marginTop:"0.56rem"}}>
                        <DarkGrayText style={{ height: "2.4375rem"}}>받을 계좌</DarkGrayText>
                        <DisplayDataTotalDiv>
                            <DisplayDataTotalText>{detailData.bank} {detailData.account} </DisplayDataTotalText>
                        </DisplayDataTotalDiv>
                    </Line>
                    <SignDiv>
                    <SignText>서약</SignText>
                    <SignText>나 {detailData.name}는 {detailData.date}까지 돈을 갚을 것을 약속합니다.  감사합니다.</SignText>
                    <img src={CheckBox} alt='체크박스 이미지'></img>
                </SignDiv>
                </DisplayBoxDiv>
            </Container>
        </ThemeProvider>
    );
}

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
    width: 11.875rem;
    height: 4.4375rem;
    background-image:url(${Talk});
    background-repeat:no-repeat;
    background-size: contain;
    top: 1%;
    left: 45%;
    z-index: 1;
    display: flex;
    //justify-content: center;
    //align-items: center;
`;

const ImageCharacter = styled.div`
    position: absolute;
    width: 7rem;
    height: 7rem;
    background-image:url(${Character});
    background-repeat:no-repeat;
    background-size: contain;
    top: 1%;
    left: 35%;
    z-index: 1;
    display: flex;
    //justify-content: center;
    //align-items: center;
`;

const ImageText = styled.div`
    color: #5B5B5B;
    display: flex;
    font-family: Pretendard;
    font-size:  0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 10rem;
    height: 2.125rem;
    padding-top: 0.55rem;
    padding-left: 0.5rem;
`;

const StyleLineProgress =styled.div`
    //max-width: 43.375rem;
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
    margin-right: 1.44rem;
    margin-left:  2.375rem;
    margin-top: 1.64rem;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    //margin-right: 2.9375rem;
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
    //padding-left: 4rem;
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

export default LeftSide;

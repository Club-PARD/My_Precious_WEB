import React, {useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import { useNavigate } from "react-router-dom"; 
import DotButton from "./DotButton.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  height: 100vh;
  justify-content: center;
`;

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 157px;
`;

const ExplainDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 51px;

    //width: 400px;
    height: 102px;
    margin-top: 45.26px;
`;

const InputForm = styled.form`
    display: flex;
    flex-direction: row;
    margin-top: 116.87px;
`;

const InputNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 269.533px;
  height: 55.393px;
  background-color: #fff;
  margin-right: 114.17px;
`;

const GrayText = styled.div`
    color: #6B6A6A;;
    font-size: 20px;
    margin-bottom: 26.77px;
    font-style: normal;
    font-weight: 500;
    line-height: 31.074px;
`;

const InputName = styled.input`
  width: 268.182px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  padding: 0;

  font-size: 20px;
  text-align: center;

    &::placeholder {
      color: #D9D9D9;
      font-size: 20px;
      text-align: center;
      margin-right: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: 31.074px;  
    }

    /* &:focus {
        border-color: #00ff00;
        outline: none;
    } */
`;

const InputBirthDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 299.926px;
  height: 55.393px;
  background-color: #fff;
`;

const InputBirthSpace = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
`;

const InputYearDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 151.317px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  margin-right: 10.13px;
  padding: 0;

  font-size: 20px;
  text-align: center;
  //align-items: center;

`;

const InputMonthDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 62.148px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  margin-right: 10.13px;
  padding: 0;

  font-size: 20px;
  text-align: center;

`;

const InputDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 62.148px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  margin-right: 10.13px;
  padding: 0;

  font-size: 20px;
  text-align: center;
`;

const StyleInput =styled.input`
  display: flex;
  padding: 0;
  margin: 0;
  width: 120px;
  border: none;
  border-radius: 6.755px;
  color: #6B6A6A;
  font-size: 20px;
  text-align: right;
  font-style: normal;
  font-weight: 500;
  line-height: 31.074px;

    //스피너를 감춤
    appearance: textfield; /* Firefox */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
    }
`;

const StyleInputLabel = styled.label`
  display: flex;
  color: #D9D9D9;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 31.074px;
  padding: 0;
  padding-bottom: 5px;
  margin: 0;
  align-items: center;

`;

const CheckBtn =styled.button`
    width: 63.499px;
    height: 55.393px;
    flex-shrink: 0;
    border-radius: 6.755px;
    background: #FF3D00;
    border: #FF3D00;

    color: #F5F5F5;

    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 31.074px;
    cursor: pointer;

`;

const WebLogin_1 = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  //임의로 지정한 인풋 값 변수
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // 버튼 활성화 여부를 결정할 상태 추가
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedYear = localStorage.getItem("year");
    const storedMonth = localStorage.getItem("month");
    const storedDay = localStorage.getItem("day");

    // 변수가 로컬스토리지에 저장되어있다면 set
    if (storedName) setName(storedName);
    if (storedYear) setYear(storedYear);
    if (storedMonth) setMonth(storedMonth);
    if (storedDay) setDay(storedDay);
  }, []);

  const handleConfirmation = (event) => {
    // 기본 양식 제출 동작 방지
    event.preventDefault();

    //인풋 값 로컬스토리지에 저장
    localStorage.setItem('name', name);
    localStorage.setItem('year', year.toString());
    localStorage.setItem('month', month.toString());
    localStorage.setItem('day', day.toString());

    console.log(name,year, month,day);
    navigate("/Login/2");
  };

  // 모든 인풋 값이 비어있지 않은지 확인하는 함수
  const areInputsFilled = useCallback(() => {
    return name.trim() !== "" && year.trim() !== "" && month.trim() !== "" && day.trim() !== "";
  }, [name, year, month, day]);

  // 입력값이 변경될 때마다 버튼 상태 업데이트
  useEffect(() => {
    setIsButtonDisabled(!areInputsFilled());
  }, [name, year, month, day, areInputsFilled]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LayoutDiv>
            <ContentDiv>
              <DotButton dotColor={1} />
              <ExplainDiv>
                고객님의 소중한 거래를 위해<br></br> 추가 정보를 기입해주세요.
              </ExplainDiv>
              <InputForm onSubmit={handleConfirmation}>
                <InputNameDiv>
                  <GrayText>이름</GrayText>
                  <InputName 
                  type="text" 
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ></InputName>
                </InputNameDiv>
                <InputBirthDiv>
                  <GrayText>생년월일</GrayText>
                  <InputBirthSpace>
                      <InputYearDiv>
                        <StyleInput 
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}></StyleInput>
                        <StyleInputLabel for="year">년</StyleInputLabel>
                      </InputYearDiv>
                      <InputMonthDiv >
                      <StyleInput 
                        id="month" 
                        type="number" 
                        style={{width:"34px"}}
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}></StyleInput>
                        <StyleInputLabel for="month">월</StyleInputLabel>
                      </InputMonthDiv>
                      <InputDateDiv >
                      <StyleInput 
                        id="day" 
                        type="number" 
                        style={{width:"34px"}}
                        value={day}
                        onChange={(e) => setDay(e.target.value)}></StyleInput>
                        <StyleInputLabel for="day">일</StyleInputLabel>
                      </InputDateDiv>
                      <CheckBtn type='submit' disabled={isButtonDisabled}>확인</CheckBtn>
                  </InputBirthSpace>
              </InputBirthDiv>
                    </InputForm>
                </ContentDiv>
            </LayoutDiv>
        </Container>
    </ThemeProvider>
    );
};

export default WebLogin_1;

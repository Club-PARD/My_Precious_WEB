import React, { useState, useEffect, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import { useNavigate } from "react-router-dom";
import DotButton from "./DotButton.js";
import { useUserData } from "../../../contexts/userContext";

const WebLogin_1 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useUserData();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [yearInput, setYearInput] = useState(null);
  const [monthInput, setMonthInput] = useState(null);
  const [dayInput, setDayInput] = useState(null);

  const handleYearChange = (e) => {
    setYearInput(e.target.value);
    setYear(e.target.value.replace(/\D/, ""));
  };

  const handleMonthChange = (e) => {
    setMonthInput(e.target.value);
    setMonth(e.target.value.replace(/\D/, ""));
  };

  const handleDayChange = (e) => {
    setDayInput(e.target.value);
    setDay(e.target.value.replace(/\D/, ""));
  };

  const handleConfirmation = (event) => {
    event.preventDefault();
    const birthDate = `${year}-${month}-${day}`;

    setUserData((prevUserData) => ({
      ...prevUserData,
      name,
      birthDate,
      year,
      month,
      day,
    }));

    navigate("/Login/3");
  };

  const areInputsFilled = useCallback(() => {
    return (
      name.trim() !== "" &&
      year.toString().trim() !== "" &&
      month.toString().trim() !== "" &&
      day.toString().trim() !== ""
    );
  }, [name, year, month, day]);

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
                      type="text"
                      maxLength="4"
                      value={year}
                      onChange={handleYearChange}
                    ></StyleInput>
                    <YearInputLabel yearInput={yearInput}>년</YearInputLabel>
                  </InputYearDiv>
                  <InputMonthDiv>
                    <StyleInput
                      id="month"
                      type="text"
                      maxLength="2"
                      style={{ width: "34px" }}
                      value={month}
                      onChange={handleMonthChange}
                    ></StyleInput>
                    <MonthInputLabel monthInput={monthInput}>
                      월
                    </MonthInputLabel>
                  </InputMonthDiv>
                  <InputDateDiv>
                    <StyleInput
                      id="day"
                      type="text"
                      maxLength="2"
                      style={{ width: "34px" }}
                      value={day}
                      onChange={handleDayChange}
                    ></StyleInput>
                    <DayInputLabel dayInput={dayInput}>일</DayInputLabel>
                  </InputDateDiv>
                  <CheckBtn type="submit" disabled={isButtonDisabled}>
                    확인
                  </CheckBtn>
                </InputBirthSpace>
              </InputBirthDiv>
            </InputForm>
          </ContentDiv>
        </LayoutDiv>
      </Container>
    </ThemeProvider>
  );
};

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
  margin-top: 9.8125rem;
`;

const ExplainDiv = styled.div`
  color: var(--black_8, #1a1a1a);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.625rem;

  height: 6.375rem;
  margin-top: 2.82875rem;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 8.43rem;
  background-color: #fff;
`;

const InputNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 16.8458125rem;
  height: 3.4620625rem;
  margin-right: 7.135625rem;
  background-color: #fff;
`;

const GrayText = styled.div`
  color: #6b6a6a;
  font-size: 1.25rem;
  margin-bottom: 1.67rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.942125rem;
  background-color: #fff;
`;

const InputName = styled.input`
  width: 16.761375rem;
  height: 3.4620625rem;
  flex-shrink: 0;
  border-radius: 0.4221875rem;
  border: 0.0844375rem solid #ff3d00;
  padding: 0;

  font-size: 1.25rem;
  text-align: center;

  background-color: #fff;
  &::placeholder {
    color: #d9d9d9;
    font-size: 1.25rem;
    text-align: center;
    margin-right: 0.6875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.942125rem;
    background-color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

const InputBirthDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 18.745375rem;
  height: 3.4620625rem;
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
  width: 9.4573125rem;
  height: 3.4620625rem;
  flex-shrink: 0;
  border-radius: 0.4221875rem;
  border: 0.0844375rem solid #ff3d00;
  align-items: center;
  margin-right: 0.633125rem;
  padding: 0;
  background-color: #fff;

  font-size: 1.25rem;
  text-align: center;
`;

const InputMonthDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 3.88425rem;
  height: 3.4620625rem;
  flex-shrink: 0;
  border-radius: 0.4221875rem;
  border: 0.0844375rem solid #ff3d00;
  margin-right: 0.633125rem;
  padding: 0;
  align-items: center;
  background-color: #fff;

  font-size: 1.25rem;
  text-align: center;
`;

const InputDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 3.88425rem;
  height: 3.4620625rem;
  flex-shrink: 0;
  border-radius: 0.4221875rem;
  border: 0.0844375rem solid #ff3d00;
  margin-right: 0.633125rem;
  padding: 0;
  align-items: center;
  background-color: #fff;

  font-size: 1.25rem;
  text-align: center;
`;

const StyleInput = styled.input`
  display: flex;
  padding: 0;
  margin: 0;
  width: 7.5rem;
  border: none;
  border-radius: 0.4221875em;
  color: black;
  font-size: 1.25rem;
  text-align: right;
  font-style: normal;
  font-weight: 500;
  line-height: 1.942125rem;
  background-color: #fff;

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

const YearInputLabel = styled.label`
  display: flex;
  color: ${(props) =>
    props.yearInput !== undefined &&
    props.yearInput !== null &&
    props.yearInput !== ""
      ? "#000"
      : "#d9d9d9"};
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.942125rem;
  padding: 0;
  margin: 0;
  align-items: center;
  height: 100%;
`;
const MonthInputLabel = styled.label`
  display: flex;
  color: ${(props) =>
    props.monthInput !== undefined &&
    props.monthInput !== null &&
    props.monthInput !== ""
      ? "#000"
      : "#d9d9d9"};
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.942125rem;
  padding: 0;
  margin: 0;
  align-items: center;
  height: 100%;
`;
const DayInputLabel = styled.label`
  display: flex;
  color: ${(props) =>
    props.dayInput !== undefined &&
    props.dayInput !== null &&
    props.dayInput !== ""
      ? "#000"
      : "#d9d9d9"};
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.942125rem;
  padding: 0;
  margin: 0;
  align-items: center;
  height: 100%;
`;

const CheckBtn = styled.button`
  width: 3.9686875rem;
  height: 3.4620625rem;
  flex-shrink: 0;
  border-radius: 0.4221875rem;
  background: #ff3d00;
  border: #ff3d00;

  color: #f5f5f5;

  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.942125rem;
  cursor: pointer;

  text-align: center;
  //font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.942125rem;
  cursor: pointer;
`;

export default WebLogin_1;

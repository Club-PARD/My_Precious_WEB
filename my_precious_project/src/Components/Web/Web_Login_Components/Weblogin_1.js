import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext.js.js"; // Context APi 적용
import DotButton from "./DotButton.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  height: 100vh;
  justify-content: center;
`;

const InputDiv = styled.div`
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
  color: #d9d9d9;
  font-size: 20px;
  margin-bottom: 26.77px;
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
    color: #d9d9d9; // 플레이스홀더의 색상을 변경
    font-size: 20px; // 플레이스홀더의 폰트 크기를 변경
    text-align: center; // 플레이스홀더의 텍스트 정렬을 변경
  }

  &:focus {
    border-color: #00ff00;
    outline: none;
  }
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

const InputYear = styled.input`
  width: 151.317px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  margin-right: 10.13px;
  padding: 0;

  font-size: 20px;
  text-align: center;

  &::placeholder {
    color: #d9d9d9;
    font-size: 20px;
    text-align: right;
    margin-right: 11px;
  }
  &:focus {
    border-color: #00ff00;
    outline: none;
  }

  //스피너를 감춤
  appearance: textfield; /* Firefox */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputMonth = styled.input`
  width: 62.148px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  margin-right: 10.13px;
  padding: 0;

  font-size: 20px;
  text-align: center;

  &::placeholder {
    color: #d9d9d9;
    font-size: 20px;
    text-align: right;
    margin-right: 11px;
  }
  &:focus {
    border-color: #00ff00;
    outline: none;
  }

  appearance: textfield; /* Firefox */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputDate = styled.input`
  width: 62.148px;
  height: 55.393px;
  flex-shrink: 0;
  border-radius: 6.755px;
  border: 1.351px solid #ff3d00;
  margin-right: 10.13px;
  padding: 0;

  font-size: 20px;
  text-align: center;

  &::placeholder {
    color: #d9d9d9;
    font-size: 20px;
    text-align: right;
    margin-right: 11px;
  }
  &:focus {
    border-color: #00ff00;
    outline: none;
  }

  appearance: textfield; /* Firefox */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  //width: 60%;
  background-color: red; //크기 확인용- 지워야함
  align-items: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue; //크기확인용2 -지워야함
  //height: 40%;
  //width: 60%;
  align-items: center;
  margin-top: 157px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const DotRow = styled(Row)`
  width: 94.573px;
  height: 15.537px;
  flex-shrink: 0;
  justify-content: space-between;
`;

const DotButton = styled.div`
  width: 14.86px;
  height: 15.54px;
  background-color: #d9d9d9;
  //border: 0px solid #D9D9D9;
  border-radius: 50%;
`;

const ExplainDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 51px;

  width: 355px;
  height: 102px;
  margin-top: 45.26px;
`;

const WebLogin_1 = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LayoutDiv>
          <ContentDiv>
            <DotButton dotColor={1} />
            <ExplainDiv>
              고객님의 소중한 거래를 위해 추가 정보를 기입해주세요.
            </ExplainDiv>
            <InputDiv>
              <InputNameDiv>
                <GrayText>이름</GrayText>
                <InputName type="text" placeholder="홍길동"></InputName>
              </InputNameDiv>
              <InputBirthDiv>
                <GrayText>생년월일</GrayText>
                <InputBirthSpace>
                  <InputYear
                    type="number"
                    placeholder="년"
                    min="1800"
                    max="2023"
                  ></InputYear>
                  <InputMonth
                    placeholder="월"
                    type="number"
                    min="1"
                    max="12"
                  ></InputMonth>
                  <InputDate
                    placeholder="일"
                    type="number"
                    min="1"
                    max="31"
                  ></InputDate>
                </InputBirthSpace>
              </InputBirthDiv>
            </InputDiv>
          </ContentDiv>
        </LayoutDiv>
      </Container>
    </ThemeProvider>
  );
};

export default WebLogin_1;

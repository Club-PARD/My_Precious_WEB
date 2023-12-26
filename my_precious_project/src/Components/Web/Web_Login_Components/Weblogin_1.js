import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import DotButton from './DotButton.js';

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

const InputDiv = styled.form`
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
    color: #6b6a6a;
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
        color: #6b6a6a; // 플레이스홀더의 색상을 변경
        font-size: 20px; // 플레이스홀더의 폰트 크기를 변경
        text-align: center; // 플레이스홀더의 텍스트 정렬을 변경
        font-style: normal;
        font-weight: 600;
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
        color: #6b6a6a;
        font-size: 20px;
        text-align: right;
        margin-right: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: 31.074px;
    }
    /* &:focus {
    border-color: #00ff00;
    outline: none;
  } */

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
        color: #6b6a6a;
        font-size: 20px;
        text-align: right;
        margin-right: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: 31.074px;
    }
    /* &:focus {
        border-color: #00ff00;
        outline: none;
    } */

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
        color: #6b6a6a;
        font-size: 20px;
        text-align: right;
        margin-right: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: 31.074px;
    }
    /* &:focus {
        border-color: #00ff00;
        outline: none;
    } */

    appearance: textfield; /* Firefox */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const CheckBtn = styled.button`
    width: 63.499px;
    height: 55.393px;
    flex-shrink: 0;
    border-radius: 6.755px;
    background: #ff3d00;
    border: #ff3d00;

    color: #f5f5f5;

    text-align: center;
    //font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 31.074px;
    cursor: pointer;
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
                            고객님의 소중한 거래를 위해<br></br> 추가 정보를 기입해주세요.
                        </ExplainDiv>
                        <InputDiv>
                            <InputNameDiv>
                                <GrayText>이름</GrayText>
                                <InputName type="text" placeholder="홍길동"></InputName>
                            </InputNameDiv>
                            <InputBirthDiv>
                                <GrayText>생년월일</GrayText>
                                <InputBirthSpace>
                                    <InputYear type="number" placeholder="년" min="1800" max="2023"></InputYear>
                                    <InputMonth placeholder="월" type="number" min="1" max="12"></InputMonth>
                                    <InputDate placeholder="일" type="number" min="1" max="31"></InputDate>
                                    <CheckBtn type="submit">확인</CheckBtn>
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

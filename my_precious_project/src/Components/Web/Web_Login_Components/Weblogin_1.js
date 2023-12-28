import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import { useNavigate } from 'react-router-dom';
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
    margin-top: 9.8125rem;
`;

const ExplainDiv = styled.div`
    color: #000;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.1875rem;

    height: 6.375rem;
    margin-top:  2.82875rem;
`;

const InputForm = styled.form`
    display: flex;
    flex-direction: row;
    margin-top: 7.304375rem;
`;

const InputNameDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 16.8458125rem;
    height: 3.4620625rem;
    background-color: #fff;
    margin-right:  7.135625rem;
`;

const GrayText = styled.div`
    color: #6b6a6a;
    font-size: 1.25rem;
    margin-bottom: 1.673125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.942125rem;
`;

const InputName = styled.input`
    width:16.761375rem;
    height: 3.4620625rem;
    flex-shrink: 0;
    border-radius: 0.4221875rem;
    border: 0.0844375rem solid #ff3d00;
    padding: 0;

    font-size: 1.25rem;
    text-align: center;

    &::placeholder {
        color: #d9d9d9;
        font-size: 1.25rem;
        text-align: center;
        margin-right: 0.6875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.942125rem;
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
    margin-right: 0.633125rem;
    padding: 0;

    font-size: 1.25rem;
    text-align: center;
    //align-items: center;
`;

const InputMonthDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 3.88425rem;
    height: 3.4620625rem;
    flex-shrink: 0;
    border-radius:0.4221875rem;
    border: 0.0844375rem solid #ff3d00;
    margin-right: 0.633125rem;
    padding: 0;

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
    color: #6b6a6a;
    font-size:  1.25rem;
    text-align: right;
    font-style: normal;
    font-weight: 500;
    line-height:  1.942125rem;

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
    color: #d9d9d9;
    text-align: center;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.942125rem;
    padding: 0;
    padding-bottom: 0.3125rem;
    margin: 0;
    align-items: center;
`;

const CheckBtn = styled.button`
    width: 3.9686875rem;
    height:  3.4620625rem;
    flex-shrink: 0;
    border-radius:  0.4221875rem;
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

const WebLogin_1 = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    //임의로 지정한 인풋 값 변수
    const [name, setName] = useState('');
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);

    // 버튼 활성화 여부를 결정할 상태 추가
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedYear = localStorage.getItem('year');
        const storedMonth = localStorage.getItem('month');
        const storedDay = localStorage.getItem('day');

        // 변수가 로컬스토리지에 저장되어있다면 set
        if (storedName) setName(storedName);
        if (storedYear) setYear(storedYear);
        if (storedMonth) setMonth(storedMonth);
        if (storedDay) setDay(storedDay);
    }, []);

    const handleConfirmation = (event) => {
        console.log('확인 함수 호출됨');
        // 기본 양식 제출 동작 방지
        event.preventDefault();

        //인풋 값 로컬스토리지에 저장
        localStorage.setItem('name', name);
        localStorage.setItem('year', year.toString());
        localStorage.setItem('month', month.toString());
        localStorage.setItem('day', day.toString());

        console.log(name, year, month, day);
        navigate('/Login/3');
    };

    // 모든 인풋 값이 비어있지 않은지 확인하는 함수
    const areInputsFilled = useCallback(() => {
        const result =  name.trim() !== '' && year.trim() !== '' && month.trim() !== '' && day.trim() !== '';
        console.log('입력값이 채워졌는지:', result);
        return result;
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
                                            type='text'
                                            maxLength="4"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value.replace(/\D/, ''))}
                                        ></StyleInput>
                                        <StyleInputLabel for="year">년</StyleInputLabel>
                                    </InputYearDiv>
                                    <InputMonthDiv>
                                        <StyleInput
                                            id="month"
                                            type="text"
                                            maxLength="2"
                                            style={{ width: '2.125rem' }}
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value.replace(/\D/, ''))}
                                        ></StyleInput>
                                        <StyleInputLabel for="month">월</StyleInputLabel>
                                    </InputMonthDiv>
                                    <InputDateDiv>
                                        <StyleInput
                                            id="day"
                                            type="text"
                                            maxLength="2"
                                            style={{ width: ' 2.125rem' }}
                                            value={day}
                                            onChange={(e) => setDay(e.target.value.replace(/\D/, ''))}
                                        ></StyleInput>
                                        <StyleInputLabel for="day">일</StyleInputLabel>
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

export default WebLogin_1;

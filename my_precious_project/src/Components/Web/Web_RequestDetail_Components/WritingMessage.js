import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
//import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import BankSelect from './BankSelect.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 31.1875rem;
    height: 22.25rem;
    flex-shrink: 0;
    border-radius:  0.625rem;
    background: #FFF;
    box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
    margin-left: 3.625rem;
    align-items: center;


`;

const TitleText = styled.div`
    color: var(--primary_orange, #FF3D00);
    text-align: center;
    font-family: Pretendard;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.375rem; /* 78.571% */
    padding-top:  1.9375rem ;
`;

const Form =styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.5rem;
`;

const Input1 = styled.textarea`
    display: flex;
    width: 25.4375rem;
    height: 3.875rem;
    flex-shrink: 0;
    overflow: auto;
    border-radius: 0.625rem;
    border: 0.0625rem solid var(--grey-Grey_2, #D9D9D9);
    padding: 1rem 1.31rem 1rem 1.31rem;
    resize: none; 

    &::placeholder {
        color: var(--grey-Grey_3, #B3B3B3);
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem; 
    }
`;


const SaveButton = styled.button`
    margin-top: 1.31rem;
    width: 16.125rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.375em;
    background: var(--primary_orange, #FF3D00);
    border: none;

    color: #FFFCFB;

    text-align: center;
    font-family: Pretendard;
    font-size:  1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height:  2.4375rem;
    cursor: pointer;
`;

const InputBoxDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 28.125rem;
    height:  2.4375rem;
    flex-shrink: 0;
    border-radius:  0.625rem;
    border: 0.0625rem solid var(--grey-Grey_2, #D9D9D9);
    padding: 0;

    color: var(--grey-Grey_4, #8E8E8E);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 278.571% */
`;

const GaryText = styled.div`
    color: var(--grey-Grey_4, #8E8E8E);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; 
    padding-left: 0.9375rem;
`;

const Input2 = styled.input`
    width: 22.125rem;
    border: none;
    border-radius: 0.625rem;
    &::placeholder {
        color: var(--grey-Grey_3, #B3B3B3);
        text-align: right;
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2.4375rem;
    }

`;

const Input3 =styled.input`
    width: 15rem;
    border: none;
    margin-left: 0.5rem;
    border-radius:  0.625rem;

    &::placeholder {
        color: var(--grey-Grey_3, #B3B3B3);
        text-align: left;
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2.4375rem;
    }
`;

function WritingMessage() {
    const theme = useTheme();

    //임의로 지정한 인풋 값 변수
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);

    // 버튼 활성화 여부를 결정할 상태 추가
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleSubmit = (event) => {
        console.log('확인 함수 호출됨');
        // 기본 양식 제출 동작 방지
        event.preventDefault();

        // input2에서 컴마 제거하고 숫자로 변환
        const numericInput2 = parseFloat(input2.replace(/,/g, ''));

        console.log(input1, numericInput2, input3, selectedBank);
    };

    // 모든 인풋 값이 비어있지 않은지 확인하는 함수
    const areInputsFilled = useCallback(() => {
        const result =  input1.trim() !== '' && input2.trim() !== '' && input3.trim() !== ''&& selectedBank !== null;
        console.log('입력값이 채워졌는지:', result);
        return result;
    }, [input1, input2, input3, selectedBank]);

    // 입력값이 변경될 때마다 버튼 상태 업데이트
    useEffect(() => {
        setIsButtonDisabled(!areInputsFilled());
    }, [input1, input2, input3,selectedBank, areInputsFilled]);

    //빌려준 금액 세자리마다 컴마 추가 함수
    const formatAmount = (value) => {
        // 비숫자 문자 제거하고 숫자로 변환
        const numericValue = parseFloat(value.replace(/[^\d]/g, ''));

        // 유효한 숫자인지 확인
        if (!isNaN(numericValue)) {
            // 세 자리 수마다 쉼표를 추가하여 숫자 형식화
            const formattedValue = numericValue.toLocaleString('en-US');
            return formattedValue;
        }

        return value;
    };
    

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TitleText>꼭 송금한 이후 작성해주세요.</TitleText>
                <Form onSubmit={handleSubmit}>
                    <Input1 type='text' placeholder='친구에게 간단한 응원 메세지를 함께 남겨보세요. 머니글러브가 도움을 잘 간직하고 있을게요. 해당글은 머글님이 계속해서 볼 수 있어요.'
                    onChange={(e) => setInput1(e.target.value)}></Input1>
                        <InputBoxDiv style={{marginTop:"1.31rem"}} >
                            <GaryText>빌려준 금액</GaryText>
                            <Input2 type='text' placeholder='금액을 선정할 때, 절대 무리해서 빌려주지 않도록 유의해주세요!'
                            value={formatAmount(input2)}
                            onChange={(e) => setInput2(e.target.value.replace(/\D/, ''))}></Input2>
                        </InputBoxDiv>
                        <InputBoxDiv style={{marginTop: "0.5rem"}}>
                            <GaryText style={{paddingRight: "0.88rem"}}>돌려받을 계좌</GaryText>
                            <BankSelect setSelectedBank={setSelectedBank} />
                            <Input3 type='text' placeholder='계좌번호'
                            value={input3}
                            onChange={(e) => setInput3(e.target.value.replace(/\D/, ''))}
                            ></Input3>
                        </InputBoxDiv>
                    <SaveButton disabled={isButtonDisabled} >저장하기</SaveButton>
                </Form>
            </Container>
        </ThemeProvider>
    );
}

export default WritingMessage;
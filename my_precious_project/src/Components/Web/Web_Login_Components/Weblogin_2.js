import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import { UserDataContext } from '../../../contexts/userContext';
import DotButton from './DotButton.js';
import { handlePhoneButtonClick, handleAuthButtonClick } from '../../../API/phoneAuth';
import WebLogin_2_checked from './Weblogin_2_checked.js';
import Modal from './Modal/Modal.js';

const WebLogin_2 = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authNumber, setAuthNumber] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태
    const [modalShow, setModalShow] = useState(false);

    const theme = useTheme();

    const authInputRef = useRef(null); // 인증번호 입력 필드에 대한 참조 생성

    const [userData, setUserData] = useContext(UserDataContext);

    const handlePress = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
            setPhoneNumber(e.target.value);
        }
    };

    useEffect(() => {
        if (phoneNumber.length === 10) {
            setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNumber.length === 13) {
            setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phoneNumber]);

    const resetAuthNumber = () => {
        setAuthNumber(''); // AuthNumber 초기화
        if (authInputRef.current) {
            authInputRef.current.value = '';
        }
    };

    useEffect(() => {
        if (!modalShow) {
            // 모달이 닫힐 때마다 인증번호 입력 필드에 포커스를 줍니다.
            authInputRef.current.focus();
        }
    }, [modalShow]);

    const handleAuthSuccess = () => {
        // 인증 성공 시 userData에 phoneNumber 추가
        setUserData((prevUserData) => ({
            ...prevUserData,
            phoneNumber,
        }));
    };

    if (isAuthenticated) {
        return <WebLogin_2_checked />; // 인증이 완료되면, 해당 컴포넌트를 렌더링
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <ContentBox>
                    <InnerRow1>
                        <DotButton dotColor={2} />
                    </InnerRow1>
                    <InnerRow2>
                        휴대폰 인증을 하면<br></br>전자서명이 가능해요!
                    </InnerRow2>
                    <InnerRow3>
                        전화번호<br></br>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Label1>
                                <input
                                    id="recaptcha-container"
                                    type="text"
                                    value={phoneNumber}
                                    placeholder="010-xxxx-xxxx"
                                    onChange={handlePress}
                                ></input>
                                <button onClick={() => handlePhoneButtonClick(phoneNumber)}>인증번호 받기</button>
                            </Label1>
                            <Label2>
                                <input
                                    ref={authInputRef}
                                    type="text"
                                    placeholder="인증번호 입력"
                                    onChange={(e) => setAuthNumber(e.target.value)}
                                ></input>
                                <button
                                    onClick={() =>
                                        handleAuthButtonClick(
                                            authNumber,
                                            (user) => {
                                                console.log('성공!', user);
                                                setIsAuthenticated(true);
                                                handleAuthSuccess();
                                            },
                                            (error) => {
                                                console.log('실패', error);
                                                setModalShow(true);
                                            }
                                        )
                                    }
                                >
                                    확인
                                </button>
                            </Label2>
                        </form>
                    </InnerRow3>
                </ContentBox>
                <div id="modal"></div>
                {modalShow && <Modal setModalShow={setModalShow} resetAuthNumber={resetAuthNumber} />}
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

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25rem;
`;
const InnerRow1 = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 9.8125rem;
    margin-bottom: 3.125rem;
`;

const InnerRow2 = styled.div`
    color: #000;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.125rem;
    width: 100%;
    margin-bottom: 6.25rem;
`;

const InnerRow3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 500;
    color: #d9d9d9;
`;

const Label1 = styled.label`
    position: relative;
    width: 100%;
    input {
        margin-top: 1.875rem;
        width: 25rem;
        height: 3.4375rem;
        border: 0.09375rem solid #ff3d00;
        border-radius:  0.40625rem;
        text-indent: 3.4375rem;
        font-size: 1.25rem;
        font-weight: 500;
        &::placeholder {
            color: #d9d9d9;
            font-size: 1.25rem;
            font-weight: 500;
        }
    }
    input:focus {
        outline: none;
    }
    button {
        position: absolute;
        margin-top: 1.9375rem;
        right: 0;
        width: 9.375rem;
        height: 3.625rem;
        border-radius: 0.40625rem;
        border: none;
        color: white;
        font-size: 1.25rem;
        font-weight: 500;
        background-color: #ff3d00;
        cursor: pointer;
    }
`;

const Label2 = styled.label`
    position: relative;
    width: 100%;
    input {
        margin-top:  1.875rem;
        width: 25rem;
        height: 3.4375rem;
        border:  0.09375rem solid #ff3d00;
        border-radius: 0.40625rem;
        text-indent: 3.4375rem;
        font-size: 1.25rem;
        font-weight: 500;
        &::placeholder {
            color: #d9d9d9;
            font-size: 1.25rem;
            font-weight: 500;
        }
    }
    input:focus {
        outline: none;
    }
    button {
        position: absolute;
        margin-top: 1.9375rem;
        right: 0;
        width: 9.375rem;
        height: 3.625rem;
        border-radius: 0.40625rem;
        border: none;
        color: white;
        font-size: 1.25rem;
        font-weight: 500;
        background-color: #ff3d00;
        cursor: pointer;
    }
`;

export default WebLogin_2;

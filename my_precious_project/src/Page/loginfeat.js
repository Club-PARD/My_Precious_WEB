// 구글로그인, 휴대폰 인증은 위한 코드입니다.

import { auth } from '../API/firebaseAPI';
import { GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';

function Phone() {
    const [userData, setUserData] = useState(null);
    const [value, setValue] = useState('');
    const [number, setPhoneNumber] = useState('');

    function getPhoneNumberFromUserInput(phoneNumber) {
        const regex = /[^0-9]/g;
        const numericOnly = phoneNumber.replace(regex, '');
        // console.log(numericOnly);

        if (numericOnly.startsWith('010') && numericOnly.length === 11) {
            console.log('+82' + numericOnly.slice(1));
            return '+82' + numericOnly.slice(1);
        }
        //  +821012345679 ( 010-1234-5678을 왼쪽과 같이, +82를 붙이고 010에서 0 하나 뺍니다)
    }

    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정

        signInWithPopup(auth, provider) // popup을 이용한 signup
            .then((data) => {
                setUserData(data.user); // user data 설정
                console.log(data); // console로 들어온 데이터 표시
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onClickHandle = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            size: 'invisible',
            callback: (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
        });
        auth.languageCode = 'ko'; // 한국어로 해줍시다
        const phoneNumber = getPhoneNumberFromUserInput(number); // 위에서 받아온 번호
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult; // window
            })
            .catch((error) => {
                console.log('SMS FAILED');
            });
    };

    const getCodeFromUserInput = () => {
        return value;
    };

    const onClickHandle2 = () => {
        const code = getCodeFromUserInput();
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log('hey YOU ARE IN SUCCESS');
                console.log(user);
                // ...
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login</button>
            {userData ? userData.displayName : null}
            <div id="sign-in-button"></div>
            <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="'-' 빼고 휴대폰 번호 입력"
            />
            <button onClick={onClickHandle}>문자보내기</button>
            <input onChange={(e) => setValue(e.target.value)} type="text" />
            <button onClick={onClickHandle2}>인증번호 확인하기</button>
        </div>
    );
}

export default Phone;

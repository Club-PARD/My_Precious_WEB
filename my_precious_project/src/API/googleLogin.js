import { app, auth } from './firebaseAPI';
import { GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';

export function handleGoogleLogin(setLogInData) {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
        .then((data) => {
            const userData = {
                uid: data.user.uid,
                name: data.user.displayName,
                emailVerified: data._tokenResponse.emailVerified,
            };
            setLogInData(userData); // user data 설정

            // axios를 이용한 POST 요청
            axios
                .post('http://3.35.43.42/moneyglove/user/join', userData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            console.log(data); // console로 들어온 데이터 표시
        })
        .catch((err) => {
            console.log(err);
        });
}

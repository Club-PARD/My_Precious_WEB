/*
import { app, auth } from "./firebaseAPI";
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export function handleGoogleLogin(data) {
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
*/

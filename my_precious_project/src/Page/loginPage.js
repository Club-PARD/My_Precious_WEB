import React from "react";
import { initializeApp } from "firebase/app";
import "firebase/auth";

// 로그인 & 휴대폰 인증 기능 구현 컴포넌트
export default function phone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyA7_WIFJ2n7A2VWXPkSvCz10X-s8TUcRjk",
    authDomain: "precious-relationship.firebaseapp.com",
    projectId: "precious-relationship",
    storageBucket: "precious-relationship.appspot.com",
    messagingSenderId: "942898473483",
    appId: "1:942898473483:web:23e2d775004447bdbd350e",
  };

  const app = initializeApp(firebaseConfig);

  const auth = firebase.auth();
  auth.languageCode = "ko";

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      const credential =
        firebase.auth.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(result);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential =
        firebase.auth.GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    }
  };

  const handlePhoneNumberSubmit = async (event) => {
    event.preventDefault();

    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "phoneNumberButton",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      }
    );

    try {
      const confirmationResult = await auth.signInWithPhoneNumber(
        `+82${phoneNumber}`,
        appVerifier
      );
      setConfirmationResult(confirmationResult);
      console.log(confirmationResult);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmCodeSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await confirmationResult.confirm(confirmCode);
      const user = result.user;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>구글 아이디로 로그인</button>

      <form onSubmit={handlePhoneNumberSubmit}>
        핸드폰 번호:{" "}
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">핸드폰 번호 전송</button>
      </form>

      <form onSubmit={handleConfirmCodeSubmit}>
        확인 코드:{" "}
        <input
          type="text"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
        />
        <button type="submit">확인 코드 전송</button>
      </form>
    </div>
  );
}

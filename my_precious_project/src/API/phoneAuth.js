import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebaseAPI';

function getPhoneNumberFromUserInput(phoneNumber) {
    const regex = /[^0-9]/g;
    const numericOnly = phoneNumber.replace(regex, '');
    // console.log(numericOnly);

    if (numericOnly.startsWith('010') && numericOnly.length === 11) {
        console.log('+82' + numericOnly.slice(1));
        return '+82' + numericOnly.slice(1);
    }
}

export function handlePhoneButtonClick(number) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {},
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
}

export function handleAuthButtonClick(authNumber, onSuccess, onError) {
    window.confirmationResult
        .confirm(authNumber)
        .then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log('hey YOU ARE IN SUCCESS');
            console.log(user);
            onSuccess && onSuccess(user); // 성공 콜백
            // ...
        })
        .catch((error) => {
            // User couldn't sign in (bad verification code?)
            onError && onError(error); // 실패 콜백
            // ...
        });
}

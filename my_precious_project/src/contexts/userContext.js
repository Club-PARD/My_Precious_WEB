import { useEffect } from 'react';
import { atom, useRecoilState, RecoilRoot } from 'recoil';

// Recoil 상태 정의
const logInDataState = atom({
    key: 'logInDataState',
    default: JSON.parse(sessionStorage.getItem('logInData')) || {},
});

const userDataState = atom({
    key: 'userDataState',
    default: JSON.parse(sessionStorage.getItem('userData')) || {},
});

export function useLogInData() {
    return useRecoilState(logInDataState);
}

export function useUserData() {
    return useRecoilState(userDataState);
}

export function UserProvider({ children }) {
    const [logInData, setLogInData] = useLogInData();
    const [userData, setUserData] = useUserData();

    useEffect(() => {
        sessionStorage.setItem('logInData', JSON.stringify(logInData));
    }, [logInData]);

    useEffect(() => {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    return <RecoilRoot>{children}</RecoilRoot>;
}

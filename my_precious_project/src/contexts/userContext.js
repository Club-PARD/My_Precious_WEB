import { createContext, useMemo, useContext } from 'react';
import { useState } from 'react';

/* 유저 데이터용 컨텍스트 생성 */
export const UserContext = createContext();
export const UserDataContext = createContext();

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserProvider');
    }
    return context;
};
/* 유저 데이터 프로바이더 생성 */
export default function UserProvider({ children }) {
    const [logInData, setLogInData] = useState({});
    const [userData, setUserData] = useState({});
    console.log(logInData.uid);
    console.log(logInData.name);
    console.log(logInData.birthDate);
    console.log(logInData.phoneNumber);

    /* 프로바이더로 넘겨줄 변수 구성 */
    const logInValue = useMemo(() => [logInData, setLogInData], [logInData, setLogInData]);
    const userValue = useMemo(() => [userData, setUserData], [userData, setUserData]);

    return (
        <UserContext.Provider value={logInValue}>
            <UserDataContext.Provider value={userValue}>{children}</UserDataContext.Provider>
        </UserContext.Provider>
    );
}

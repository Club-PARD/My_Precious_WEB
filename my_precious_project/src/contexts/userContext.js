import { createContext, useMemo } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

/* 유저 데이터용 컨텍스트 생성 */
export const UserContext = createContext();

/* 유저 데이터 프로바이더 생성 */
export default function UserProvider({ children }) {
    const [logInData, setLogInData] = useState({});
    console.log(logInData.uid);
    console.log(logInData.name);
    console.log(logInData.emailVerified);

    const [userData, setUserData] = useState({});
    console.log(userData);

    //   /* 서버로부터 유저 데이터 받아오는 함수 */
    //   const getData = async () => {
    //     const data = await axios.get("http://172.17.200.74:8080/api/v1/user/" + logInData.uid);
    //     setUserData(data.data.data);
    //   }

    //   /* 첫 렌더링 시에만 유저 데이터 받아오기 */
    //   useEffect(() => {
    //     getData();
    //   }, [logInData]);

    /* 프로바이더로 넘겨줄 변수 구성 */
    const value = useMemo(() => [logInData, setLogInData], [logInData, setLogInData]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

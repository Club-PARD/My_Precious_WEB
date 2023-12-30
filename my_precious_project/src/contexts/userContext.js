import { createContext, useMemo, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();
export const UserDataContext = createContext();

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserData must be used within a UserProvider');
    }
    return context;
};

export default function UserProvider({ children }) {
    const [logInData, setLogInData] = useState(() => {
        const storedLogInData = JSON.parse(localStorage.getItem('logInData'));
        return storedLogInData || {};
    });

    const [userData, setUserData] = useState(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        return storedUserData || {};
    });

    useEffect(() => {
        localStorage.setItem('logInData', JSON.stringify(logInData));
    }, [logInData]);

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    const logInValue = useMemo(() => [logInData, setLogInData], [logInData]);
    const userValue = useMemo(() => [userData, setUserData], [userData]);

    return (
        <UserContext.Provider value={logInValue}>
            <UserDataContext.Provider value={userValue}>{children}</UserDataContext.Provider>
        </UserContext.Provider>
    );
}

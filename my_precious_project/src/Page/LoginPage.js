import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WebLogin_1 from '../Components/Web/Web_Login_Components/Weblogin_1';
import WebLogin_2 from '../Components/Web/Web_Login_Components/Weblogin_2';
import AppHome from '../Components/App/App_Home_Components/AppHome';

// /login으로 접속하면 /login/1로 자동으로 로그인 첫 페이지로 넘어가게
const RedirectLogin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/Login/1');
    }, [navigate]);

    return null;
};

const LoginPage = () => {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

    return (
        <>
            {isDesktopOrMobile === true ? (
                <div>
                    <AppHome />
                </div>
            ) : (
                <div>
                    <Routes>
                        <Route path="/" element={<RedirectLogin />} />
                        <Route
                            path="1"
                            element={
                                <>
                                    <WebLogin_1 />
                                </>
                            }
                        />
                        <Route
                            path="2"
                            element={
                                <>
                                    <WebLogin_2 />
                                </>
                            }
                        />
                    </Routes>
                </div>
            )}
        </>
    );
};

export default LoginPage;

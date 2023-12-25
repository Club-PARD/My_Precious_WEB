import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WebLogin_1 from '../Components/Web/Web_Login_Components/Weblogin_1';
import WebLogin_2 from '../Components/Web/Web_Login_Components/Weblogin_2';
import WebLogin_3 from '../Components/Web/Web_Login_Components/Weblogin_3';
import AppHome from '../Components/App/App_Home_Components/AppHome';

// /login으로 접속하면 /login/1로 자동으로 로그인 첫 페이지로 넘어가게
const RedirectLogin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/Login/1');
    }, [navigate]);

    return null;
};

<<<<<<< HEAD:my_precious_project/src/Page/LoginPage1.js
const LoginPage1 = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.
=======
const LoginPage = () => {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' }); // 758px 이하일 때는 모바일 뷰로 바뀐다.
>>>>>>> main:my_precious_project/src/Page/LoginPage.js

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
                        <Route
                            path="3"
                            element={
                                <>
                                    <WebLogin_3 />
                                </>
                            }
                        />
                    </Routes>
                </div>
            )}
        </>
    );
};

export default LoginPage1;

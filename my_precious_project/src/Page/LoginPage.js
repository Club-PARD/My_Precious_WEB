import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Routes, Route, useNavigate } from "react-router-dom";
import WebLogin1 from "../Components/Web/Web_Login_Components/Weblogin_1";
import WebLogin2 from "../Components/Web/Web_Login_Components/Weblogin_2";
import WebLogin3 from "../Components/Web/Web_Login_Components/Weblogin_3";
import AppHome from "../Components/App/App_Home_Components/AppHome";
import Googlelogin from "../Components/Web/Web_Login_Components/Googlelogin";

// /login으로 접속하면 /login/1로 자동으로 로그인 첫 페이지로 넘어가게
const RedirectLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Login/1");
  }, [navigate]);

  return null;
};

const LoginPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<RedirectLogin />} />
          <Route
            path="1"
            element={
              <>
                <Googlelogin />
              </>
            }
          />
          <Route
            path="2"
            element={
              <>
                <WebLogin1 />
              </>
            }
          />
          <Route
            path="3"
            element={
              <>
                <WebLogin2 />
              </>
            }
          />
          <Route
            path="4"
            element={
              <>
                <WebLogin3 />
              </>
            }
          />
        </Routes>
      </div>
      {/* {isDesktopOrMobile === true ? (
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
                                    <Googlelogin />
                                </>
                            }
                        />
                        <Route
                            path="2"
                            element={
                                <>
                                    <WebLogin1 />
                                </>
                            }
                        />
                        <Route
                            path="3"
                            element={
                                <>
                                    <WebLogin2 />
                                </>
                            }
                        />
                        <Route
                            path="4"
                            element={
                                <>
                                    <WebLogin3 />
                                </>
                            }
                        />
                    </Routes>
                </div>
            )} */}
    </>
  );
};

export default LoginPage;

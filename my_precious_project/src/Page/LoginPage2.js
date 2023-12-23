import React from "react";
import { useMediaQuery } from "react-responsive";
import WebLogin_2 from "../Components/Web/Web_Login_Components/Weblogin_2";
import AppHome from "../Components/App/App_Home_Components/AppHome";

const LoginPage2 = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppHome />
        </div>
      ) : (
        <div>
          <WebLogin_2 />
        </div>
      )}
    </>
  );
};

export default LoginPage2;

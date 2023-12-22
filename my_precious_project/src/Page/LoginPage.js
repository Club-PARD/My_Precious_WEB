import React from "react";
import { useMediaQuery } from "react-responsive";
import WebLogin from "../Components/Web/Web_Home_Components/Weblogin";
import AppHome from "../Components/App/App_Home_Components/AppHome";

const LoginPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppHome />
        </div>
      ) : (
        <div>
          <WebLogin />
        </div>
      )}
    </>
  );
};

export default LoginPage;

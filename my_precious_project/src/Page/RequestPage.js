import React from "react";
import { useMediaQuery } from "react-responsive";
import AppHome from "../Components/App/App_Home_Components/AppHome";
import Header from "../Components/Web/Layout_Components/Mypage_header";

const RequestPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppHome />
        </div>
      ) : (
        <div>
          <Header />
        </div>
      )}
    </>
  );
};

export default RequestPage;

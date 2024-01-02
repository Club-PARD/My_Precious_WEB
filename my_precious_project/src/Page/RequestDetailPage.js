import React from "react";
import { useMediaQuery } from "react-responsive";
import AppRequestDetail from "../Components/App/App_RequestDetail_Components/AppRequestDetail";
import WebRequestDetail from "../Components/Web/Web_RequestDetail_Components/WebRequestDetail";

const RequestDetailPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      <div>
        <WebRequestDetail />
      </div>
      {/* {isDesktopOrMobile === true ? (
        <div>
          <AppRequestDetail />
        </div>
      ) : (
        <div>
          <WebRequestDetail />
        </div>
      )} */}
    </>
  );
};

export default RequestDetailPage;

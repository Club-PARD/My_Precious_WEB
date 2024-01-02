import React from "react";
import { useMediaQuery } from "react-responsive";
import AppRequest from "../Components/App/App_Request_Components/AppRequest";
import WebRequest from "../Components/Web/Web_Request_Components/WebRequest";

const RequestPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      <div>
        <WebRequest />
      </div>
      {/* {isDesktopOrMobile === true ? (
        <div>
          <AppRequest />
        </div>
      ) : (
        <div>
          <WebRequest />
        </div>
      )} */}
    </>
  );
};

export default RequestPage;

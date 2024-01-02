import React from "react";
import { useMediaQuery } from "react-responsive";
import AppManageRequest from "../Components/App/App_ManageRequest_Components/AppManageRequest";
import WebRequest from "../Components/Web/Web_Request_Components/WebRequest";

const ManagePage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      <div>
        <WebRequest />
      </div>
      {/* {isDesktopOrMobile === true ? (
        <div>
          <AppManageRequest />
        </div>
      ) : (
        <div>
          <WebManageRequest />
        </div>
      )} */}
    </>
  );
};

export default ManagePage;

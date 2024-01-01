import React from "react";
import { useMediaQuery } from "react-responsive";
import AppManageRequest from "../Components/App/App_ManageRequest_Components/AppManageRequest"; 
import WebManageRequest from "../Components/Web/Web_ManageRequest_Components/WebManageRequest";

const ManagePage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppManageRequest />
        </div>
      ) : (
        <div>
          <WebManageRequest />
        </div>
      )}
    </>
  );
};

export default ManagePage;
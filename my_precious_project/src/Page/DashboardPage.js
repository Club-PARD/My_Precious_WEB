import React from "react";
import { useMediaQuery } from "react-responsive";
import AppDashboard from "../Components/App/App_Dashboard_Components/AppDashboard";
import WebDashboard from "../Components/Web/Web_Dashboard_Components/WebDashboard";

const DashboardPage = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppDashboard />
        </div>
      ) : (
        <div>
          <WebDashboard />
        </div>
      )}
    </>
  );
};

export default DashboardPage;

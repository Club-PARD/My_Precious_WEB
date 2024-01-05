import { useEffect } from "react";
import { atom, useRecoilState, RecoilRoot } from "recoil";

// Recoil 상태 정의
const logInDataState = atom({
  key: "logInDataState",
  default: JSON.parse(sessionStorage.getItem("logInData")) || {},
});

const userDataState = atom({
  key: "userDataState",
  default: JSON.parse(sessionStorage.getItem("userData")) || {},
});

export function useLogInData() {
  return useRecoilState(logInDataState);
}

export function useUserData() {
  return useRecoilState(userDataState);
}

// 링크를 통해 채권자 글읽기 페이지로 이동한 상황에서 로그인이 안되어있을 때 로그인 페이지로 이동함 -> 로그인이 끝난 경우 바로 해당 채권자 글읽기 페이지로 이동할 수 있도록 관리

const LinkToRequestdetail = atom({
	key: "LinkToRequestdetail",
	default: false,
});

export function useLinkToState() {
  return useRecoilState(LinkToRequestdetail);
}

const LinkToGetboardid= atom({
	key: "LinkToGetboardid",
	default: "",
});

export function useLinkToGetboardid() {
  return useRecoilState(LinkToGetboardid);
}
////////////////////////


export function UserProvider({ children }) {
  const [logInData, setLogInData] = useLogInData();
  const [userData, setUserData] = useUserData();

  useEffect(() => {
    sessionStorage.setItem("logInData", JSON.stringify(logInData));
  }, [logInData]);

  useEffect(() => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return <RecoilRoot>{children}</RecoilRoot>;
}

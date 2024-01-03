import { app, auth } from "./firebaseAPI";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

export async function handleGoogleLogin(setLogInData, setUserData, navigate) {
  const provider = new GoogleAuthProvider();

  try {
    const data = await signInWithPopup(auth, provider);
    const userData = {
      gmailId: data.user.email,
      uid: data.user.uid,
    };
    setLogInData(userData);

    // axios를 이용한 POST 요청
    const response = await axios.post(
      "http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v23/users",
      userData
    );
    console.log(response.data);

    // POST 요청 후 받은 id 값을 UserDataContext에 저장
    const uid = response.data.data?.uid;
    const name = response.data.data?.name;
    setUserData((prevUserData) => ({
      ...prevUserData,
      uid,
    }));

    // 응답을 받아와서 email, birth, phoneNum 값을 확인
    const userEmail = response.data.data?.gmailId;
    const userBirth = response.data.data?.birth;
    const userPhoneNum = response.data.data?.phoneNum;

    // email이 존재하는 경우
    if (userEmail) {
      // birth와 phoneNum이 모두 존재하는 경우 Dashboard로 이동
      if (userBirth && userPhoneNum) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          name,
        }));
        navigate("/dashboard");
      } else {
        // 하나라도 존재하지 않는 경우 Login으로 이동
        navigate("/login/2");
      }
    } else {
      // email이 존재하지 않는 경우 Login으로 이동
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
  }
}

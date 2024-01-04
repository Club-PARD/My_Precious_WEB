import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { Context } from "react-responsive";
import styled from "styled-components";
import ImageX from "../../../../Assets/img/ImageX.png";
import { useUserData } from "../../../../contexts/userContext";
import axios from "axios";
import BlueCharacter from "../../../../Assets/img/BlueCharacter.svg";

function SentToEmailModal({ props }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useUserData();
  const uid = userData.uid;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);

  const openModal = () => {
    //스크롤 비활성화
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
  };

  const closeModal = () => {
    //스크롤 활성화
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);

    const data = {
      address: props.sendToEmail,
      title: title,
      message: message,
    };

    axios
      .post(
        `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v23/mails`,
        data
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("error: " + error));

    closeModal();
  };

  return (
    <div>
      {props.function === "재촉편지" ? (
        <ChaseUpBtn onClick={openModal}>{props.function} 작성</ChaseUpBtn>
      ) : (
        <ThankUBtn onClick={openModal}>{props.function} 작성</ThankUBtn>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customModalStyles}
      >
        <ContextDiv>
          <ImageXBtn onClick={closeModal} />
          <HeaderText>
            머니글러브에서 <HeaderOrange> {props.function}</HeaderOrange>를
            작성해보세요!
          </HeaderText>
          <GuideText>
            <div style={{display: "flex"}}>{props.subHeader}</div>
          </GuideText>
          <Form style={{width:"36.8125rem", alignItems: "end"}}>
            <Input1
              placeholder="제목을 작성하는 곳"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input1>
            <Input2
              placeholder={props.longplacehorder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></Input2>
            <SubmitBtn type="submit" onClick={handleSubmit}>
              보내기
            </SubmitBtn>
          </Form>
          <BlueImage/>
        </ContextDiv>
      </Modal>
    </div>
  );
}

//overlay는 모달 창 바깥 부분, content는 모달 창부분
const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "45.4375rem",
    height: "29.3125rem",
    padding: "0",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.25rem",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    overflow: "auto",
    border: "none",
    display: "flex",
    overflow: "hidden",
  },
};

const ChaseUpBtn = styled.button`
  display: flex;
  width: 10.9375rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.375rem;
  background: #b3b3b3;
  border: none;
  align-items: center;
  justify-content: center;
  color: #fffcfb;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem;
  padding: 0;
  cursor: pointer;
  &:hover {
    background: #ff3d00;
  }
`;

const ThankUBtn = styled.button`
  display: flex;
  width: 12.6875rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #b3b3b3;
  border: none;
  align-items: center;
  justify-content: center;
  color: #fffcfb;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem;
  padding: 0;
  cursor: pointer;
  &:hover {
    background: #ff3d00;
  }
`;

const ContextDiv = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  width: 39rem;
  padding-top: 3.06rem;
  //padding-left: 3.2rem;
  position: relative;
  align-items: center;
  position: relative;
`;

const BlueImage = styled.div`
  display: flex;
  width: 8.56269rem;
  height: 8.42856rem;
  position: absolute;
  background-image: url(${BlueCharacter});
  background-repeat: no-repeat;
  background-size: contain;
  top: 72%;
  left: -2%;
  z-index: 0;
  display: flex;
`;
const ImageXBtn = styled.button`
  position: absolute;
  width: 1.32625rem;
  height: 1.42988rem;
  flex-shrink: 0;
  background-image: url(${ImageX});
  background-repeat: no-repeat;
  background-size: contain;
  top: 6%;
  left: 100%;
  z-index: 0;
  display: flex;
  border: none;
  cursor: pointer;
`;

const HeaderText = styled.div`
  display: flex;
  height: 1.9375rem;
  flex-shrink: 0;
  color: #504f4f;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem;
`;

const HeaderOrange = styled(HeaderText)`
  color: var(--primary_orange, #ff3d00);
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem;
  padding-left: 0.3rem;
`;

const GuideText = styled.div`
  display: flex;
  height: 2.5rem;
  width : 36.8125rem;
  flex-shrink: 0;
  color: var(--grey-grey-6-secondary, #504F4F);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem; /* 166.667% */
  padding-top: 0.44rem;
  align-items: center;
  justify-content: start;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-top: 1.19rem;
`;

const Input1 = styled.textarea`
  display: flex;
  width: 33.9325rem;
  height: 2.4375rem;
  flex-shrink: 0;
  overflow: auto;
  border-radius: 0.625rem;
  border: 1px solid var(--grey-Grey_2, #d9d9d9);
  padding-left: 1.44rem;
  padding-right: 1.44rem;
  resize: none;
  color: var(--grey-Grey_7, #3E3E3E);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.4375rem; /* 243.75% */

  &::placeholder {
    color: var(--grey-Grey_3, #b3b3b3);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.875rem;
  }
  &:focus {
    outline: none;
  }
`;

const Input2 = styled(Input1)`
  width: 33.9325rem;
  height: 8.1225rem;
  flex-shrink: 0;
  color: var(--grey-Grey_3, #B3B3B3);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.63rem;
  padding-top: 0.94rem;
`;

const SubmitBtn = styled.div`
  display: flex;
  width: 12.6875rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: var(--primary_orange, #ff3d00);
  color: #fff;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.1875rem; /* 118.75% */
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export default SentToEmailModal;

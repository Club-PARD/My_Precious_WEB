import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";

const Modal = ({
  setModalShow,
  setNextStep,
  content1,
  content2,
  buttonContent,
  close,
}) => {
  const [fadeType, setFadeType] = useState(null);

  const handleRetry = () => {
    setFadeType("out");
    setTimeout(() => {
      setModalShow(false);
      setNextStep();
    }, 500);
  };

  const handleClose = () => {
    setFadeType("out");
    setModalShow(false);
  };

  useEffect(() => {
    setFadeType("in");
  }, []);

  return createPortal(
    <CSSTransition
      in={fadeType === "in"}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <ModalBg fadeType={fadeType}>
        <ModalBox>
          <CloseButtonContainer>
            {close ? (
              <CloseButton
                src={process.env.PUBLIC_URL + "/img/CloseButton.svg"}
                onClick={handleClose}
              ></CloseButton>
            ) : (
              <></>
            )}
          </CloseButtonContainer>

          <ContentBox>
            <Content>{content1}</Content>
            <Content>{content2}</Content>
          </ContentBox>
          <Retry>
            <RetryButton cancel onClick={handleRetry}>
              {buttonContent}
            </RetryButton>
          </Retry>
        </ModalBox>
      </ModalBg>
    </CSSTransition>,
    document.getElementById("modal")
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalBg = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.71);
  animation: ${(props) =>
    props.fadeType === "in"
      ? css`
          ${fadeIn} 0.5s
        `
      : css`
          ${fadeOut} 0.5s
        `};
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: cesnter; */
  align-items: center;
  width: 500px;
  height: 275px;
  background-color: white;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 3.9375rem;
  font-size: 1.125rem;
  font-weight: 500;
  padding-top: 2.695rem;
  padding-bottom: 2.25rem;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  /* height: 100%; */
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: #8e8e8e;
`;

const Retry = styled.div`
  display: flex;
  flex-direction: column;
  height: 3rem;
`;

const RetryButton = styled.button`
  border-radius: 10px;
  border: none;
  background-color: #ff3d00;
  width: 12.6875rem;
  height: 3rem;
  color: white;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.1875rem; /* 118.75% */
  cursor: pointer;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 29.9375rem;
  height: 0.875rem;
  margin: 1.56rem 1.69rem 0rem 0rem;
`;
const CloseButton = styled.img`
  /* top: 1rem; */
  width: 0.875rem;
  height: 0.875rem;
  cursor: pointer;
`;

export default Modal;

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ setModalShow, resetAuthNumber }) => {
    const [fadeType, setFadeType] = useState(null);

    const handleRetry = () => {
        setFadeType('out');
        setTimeout(() => {
            setModalShow(false);
            resetAuthNumber();
        }, 500);
    };

    useEffect(() => {
        setFadeType('in');
    }, []);

    return createPortal(
        <CSSTransition in={fadeType === 'in'} timeout={500} classNames="fade" unmountOnExit>
            <ModalBg fadeType={fadeType}>
                <ModalBox>
                    <ContentBox>
                        <Content>
                            휴대폰 본인 인증 정보가 일치하지 않습니다.<br></br> 확인 후 재입력 바랍니다.
                        </Content>
                    </ContentBox>
                    <Retry>
                        <RetryButton cancel onClick={handleRetry}>
                            재시도
                        </RetryButton>
                    </Retry>
                </ModalBox>
            </ModalBg>
        </CSSTransition>,
        document.getElementById('modal')
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
        props.fadeType === 'in'
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
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 275px;
    background-color: white;
    border-radius: 10px;
`;

const ContentBox = styled.div`
    text-align: center;
    width: 100%;
    height: 75%;
    font-size: 20px;
    font-weight: 500;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    color: #8e8e8e;
`;

const Retry = styled.div`
    display: flex;
    flex-direction: column;
    height: 25%;
`;

const RetryButton = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #ff3d00;
    width: 185px;
    height: 45px;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

export default Modal;

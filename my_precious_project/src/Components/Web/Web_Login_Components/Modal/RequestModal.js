import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const RequestModal = ({ setModalShow }) => {
    const [fadeType, setFadeType] = useState(null);

    const handleRetry = () => {
        setFadeType('out');
        setTimeout(() => {
            setModalShow(false);
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
                            지금 작성하신 글은 금융 범죄 예방을 위해<br></br>
                            <span>수정 및 삭제가 어렵습니다.</span>
                            내용이 맞는지 확인해주세요.
                            <SmallContent>(단, 도와준 이력이 없는 글은 삭제 가능)</SmallContent>
                        </Content>
                    </ContentBox>
                    <ButtonContainer>
                        <Cancel>
                            <CancelButton cancel onClick={handleRetry}>
                                취소
                            </CancelButton>
                        </Cancel>
                        <Confirm>
                            <ConfirmButton>작성 완료</ConfirmButton>
                        </Confirm>
                    </ButtonContainer>
                </ModalBox>
            </ModalBg>
        </CSSTransition>,
        document.getElementById('requestModal')
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
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #8e8e8e;
    span {
        color: #ff3d00;
        font-size: 18px;
        font-weight: 700;
        line-height: 25px;
    }
`;

const SmallContent = styled.div`
    margin-top: 25px;
    color: #797979;
    font-size: 14px;
    font-weight: 500;
`;

const Cancel = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const CancelButton = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #b3b3b3;
    width: 165px;
    height: 45px;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

const Confirm = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 34%;
`;

const ConfirmButton = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #ff3d00;
    width: 165px;
    height: 100%;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 38px;
    width: 15%;
`;
export default RequestModal;

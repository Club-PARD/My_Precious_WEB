import React, { useState, useEffect , useContext} from 'react';
import Modal from 'react-modal';
import { Context } from 'react-responsive';
import styled from 'styled-components';
import ImageX from '../../../../Assets/img/ImageX.png';
import { UserDataContext } from '../../../../contexts/userContext';

//npm i react-modal

function SentToEmailModal({props}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useContext(UserDataContext);
  const uid = userData.uid;

  const openModal = () => {
    //스크롤 비활성화
    document.body.style.overflow = 'hidden'; 
    setModalIsOpen(true);
  };

  const closeModal = () => {
    //스크롤 활성화
    document.body.style.overflow = 'auto'; 
    setModalIsOpen(false);
  };


  return (
    <div>
      <ChaseUpBtn onClick={openModal}>{props.function} 작성</ChaseUpBtn>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customModalStyles}
      >
        
        <ContextDiv>
          <ImageXBtn onClick={closeModal}/>
          <HeaderText>머니글러브에서 <HeaderOrange> {props.function}</HeaderOrange>를 작성해보세요!</HeaderText>
          <GuideText>{props.subHeader}</GuideText>
          <Form>
            <Input1 placeholder='제목을 작성하는 곳'></Input1>
            <Input2 placeholder= {props.longplacehorder}></Input2>
            <SubmitBtn onClick={closeModal}>보내기</SubmitBtn>
          </Form>
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
  },
};

const ChaseUpBtn =styled.button`
    display: flex;
    width: 9.875rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    background:  #B3B3B3;
    border: none;
    align-items: center;
    justify-content: center;
    color: #FFFCFB;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem;
    padding: 0;
    cursor: pointer;
    &:hover {
      background:  #FF3D00;
    }
`;

const ContextDiv =styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  width: 39rem;
  padding-top: 2.2rem ;
  padding-left: 3.2rem;
  position: relative;
`;

const ImageXBtn = styled.button`
    position: absolute;
    width: 1.32625rem;
    height: 1.42988rem;
    flex-shrink: 0;
    background-image:url(${ImageX});
    background-repeat:no-repeat;
    background-size: contain;
    top: 6%;
    left: 100%;
    z-index: 0;
    display: flex;
    border: none;
    cursor: pointer;
`;

const HeaderText =styled.div`
  display: flex;
  height: 1.9375rem;
  flex-shrink: 0;
  color:  #504F4F;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem; 
`

const HeaderOrange =styled(HeaderText)`
  color: var(--primary_orange, #FF3D00);
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem;
  padding-left: 0.3rem;
`

const GuideText =styled.div`
  display: flex;
  height: 2.5rem;
  flex-shrink: 0;
  color: var(--grey-grey-6-secondary, #504F4F);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.875rem;
  padding-top: 0.37rem;

`;

const Form =styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-top: 1.19rem;
`;

const Input1 = styled.textarea`
    display: flex;
    width: 33.8225rem;
    height: 2.4375rem;
    flex-shrink: 0;
    overflow: auto;
    border-radius: 0.625rem;
    border: 1px solid var(--grey-Grey_2, #D9D9D9);
    padding-left: 1.87rem ;
    padding-right:1.87rem ;
    padding-top: 0.5rem;
    resize: none; 
    color: var(--grey-Grey_3, #B3B3B3);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    //line-height: 1.875rem; 

    &::placeholder {
      color: var(--grey-Grey_3, #B3B3B3);
      font-family: Pretendard;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.875rem; 
    }
    &:focus{
        outline: none;
    }
`;

const Input2 =styled(Input1)`
  width: 33.8225rem;
  height: 11.5rem;
  flex-shrink: 0;
  color: var(--grey-Grey_3, #B3B3B3);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.56rem;
`;

const SubmitBtn =styled.div`
  display: flex;
  width: 12.6875rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: var(--primary_orange, #FF3D00);
  color: #FFF;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.1875rem; /* 118.75% */
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-left: 25rem;
`;

export default SentToEmailModal;

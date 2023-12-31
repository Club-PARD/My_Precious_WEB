import React, { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
/****  MUI Libraries  *****/
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useUserData } from "../../../contexts/userContext";
import Modal from "../Web_Login_Components/Modal/Modal.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 29.25rem;
  height: 21.25rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #FAFAFA;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
  margin-left: 1.25rem;
  align-items: center;
`;

const TitleText = styled.div`
  color: var(--primary_orange, #FF3D00);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem; /* 78.571% */
  padding-top: 2.19rem;
`;

const SaveButton = styled.button`
  margin-top: 1.31rem;
  width: 26.125rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.375em;
  background: ${(props) => (props.disabled ? "#D9D9D9" : "#FF3D00")};
  border: none;

  color: #FFFCFB;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 1.62rem;
  cursor: pointer;
`;

const RowTextDiv =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const GaryText = styled.div`
  color: var(--grey-Grey_4, #8E8E8E);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.5rem;
`;

const Input1 = styled.textarea`
  display: flex;
  width: 18.6825rem;
  height: 2.37rem;
  flex-shrink: 0;
  overflow: auto;
  border-radius: 0.625rem;
  border: 0.0625rem solid var(--grey-Grey_2, #d9d9d9);
  padding: 0.5rem 0.69rem 0.63rem 0.69rem;
  resize: none;
  color: var(--grey-Grey_5, #696666);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 142.857% */
  margin-bottom: 0.56rem;

  &::placeholder {
    color: var(--grey-Grey_3, #b3b3b3);
    text-align: left;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
  }
  &:focus {
    outline: none;
  }
`;

const Input2 = styled.input`
display: flex;
  width: 15.8425rem;
  height: 1.1575rem;
  border-radius: 0.625rem;
  border: none;
  padding: 0.61rem 0.64rem 0.61rem 0.94rem ;
  color: #696969;
  text-align: right;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &::placeholder {
    color: var(--grey-Grey_3, #b3b3b3);
    text-align: left;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4375rem;
  }

  &:focus {
    outline: none;
  }
`;

const Input2Div =styled.div`
  display: flex;
  width: 20.0625rem;
  height: 2.4375rem;
  flex-shrink: 0;
  text-align: right;
  border-radius: 0.625rem;
  border: 1px solid #D9D9D9;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  margin-bottom: 0.5rem;
  
  color: #696969;
  text-align: left;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  //justify-content: center;
`;

const Input3Div =styled.div`
  display: flex;
  width: 18.1825rem;
  height: 2.4375rem;
  flex-shrink: 0;
  text-align: right;
  border-radius: 0.625rem;
  border: 1px solid #D9D9D9;
  justify-content: end;
  align-items: center;
  background-color: #FFFFFF;
  padding-left: 0.94rem;
  padding-right: 0.94rem;
  
  color: #696969;
  text-align: left;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  //justify-content: center;
  align-items: center;
`;

const Input3 = styled.input`
  width: 9rem;
  border: none;
  //margin-left: 0.5rem;
  padding: 0;
  padding-left: 1rem;
  border-radius: 0.625rem;
  height: 2rem;
  text-align: right;
  color: #696969;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  &::placeholder {
    color: var(--grey-Grey_3, #b3b3b3);
    text-align: right;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4375rem;
  }
  &:focus {
    outline: none;
  }
`;

function WritingMessage({ checkSendMessage, setCheckSendMessage, boardId }) {
  const theme = useTheme();
  const [userData, setUserData] = useUserData();
  const uid = userData.uid;
  const [modalShow, setModalShow] = useState(false);

  //임의로 지정한 인풋 값 변수
  const [form, setForm] = useState({
    lendMoney: "",
    message: "",
    bank: "은행 선택",
    bankAccount: "",
  });

  const banks = [
    "농협 은행",
    "카카오뱅크",
    "국민 은행",
    "신한 은행",
    "토스뱅크",
    "우리 은행",
    "IBK 기업 은행",
    "하나 은행",
    "새마을 은행",
    "부산 은행",
    "대구 은행",
    "케이뱅크",
    "신협 은행",
    "우체국 은행",
    "경남 은행",
    "광주 은행",
    "수협 은행",
    "전북 은행",
    "저축 은행",
    "제주 은행",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // 버튼 활성화 여부를 결정할 상태 추가
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const navigateToRequestdetail = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (event) => {
    console.log("확인 함수 호출됨");
    // 기본 양식 제출 동작 방지
    event.preventDefault();

    // 쉼표 제거
    let nocommalendmoney = form.lendMoney.replace(/,/g, "");
    const Data = {
      lendMoney: nocommalendmoney,
      message: form.message,
      bank: form.bank,
      bankAccount: form.bankAccount,
    };
    //서버에 유저 데이터 보내기

    console.log("보낸 데이터 확인", Data);
    axios
      .post(
        `https://moneyglove.site:8080/api/v23/debts/boards/${boardId}/users/${uid}`,
        Data
      )
      .then((response) => {
        console.log(Data);
        console.log("데이터가 전송되었습니다: ", response.data);
        //서버에서의 응답을 처리합니다.
        const detId = response.data.data.id;
        console.log(detId);
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류 발생: ", error);
        // 오류를 처리합니다.
      });

    //console.log(form.lendMoney, form.message, form.bank, form.bankAccount);
    setCheckSendMessage(!checkSendMessage);
  };

  // 모든 인풋 값이 비어있지 않은지 확인하는 함수
  const areInputsFilled = useCallback(() => {
    const result =
      form.lendMoney.trim() !== "" &&
      form.message.trim() !== "" &&
      form.bank.trim() !== "은행 선택" &&
      form.bankAccount !== "";
    console.log("입력값이 채워졌는지:", result);
    return result;
  }, [form.lendMoney, form.message, form.bank, form.bankAccount]);

  // 입력값이 변경될 때마다 버튼 상태 업데이트
  useEffect(() => {
    setIsButtonDisabled(!areInputsFilled());
  }, [
    form.lendMoney,
    form.message,
    form.bank,
    form.bankAccount,
    areInputsFilled,
  ]);

  //빌려준 금액 세자리마다 컴마 추가 함수
  const formatAmount = (value) => {
    // 비숫자 문자 제거하고 숫자로 변환
    const numericValue = parseFloat(value.replace(/[^\d]/g, ""));

    // 유효한 숫자인지 확인
    if (!isNaN(numericValue)) {
      // 세 자리 수마다 쉼표를 추가하여 숫자 형식화
      const formattedValue = numericValue.toLocaleString("en-US");
      return formattedValue;
    }

    return value;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleText>꼭 송금한 이후 작성해주세요.</TitleText>
        <Form onSubmit={handleSubmit}>
          <RowTextDiv>
          <GaryText>응원 메세지</GaryText>
            <Input1
              type="text"
              placeholder="친구에게 간단한 응원 메세지를 함께 남겨보세요. 머니글러브가 도움을 잘 간직하고 있을게요. 해당글은 머글님이 계속해서 볼 수 있어요."
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></Input1>
          </RowTextDiv>
          <RowTextDiv>
            <GaryText>빌려준 금액</GaryText>
            <Input2Div>
              <Input2
                type="text"
                placeholder="절대 무리해서 빌려주지 않도록 유의해주세요!"
                value={formatAmount(form.lendMoney)}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    lendMoney: e.target.value.replace(/\D/, ""),
                  }))
                }
              ></Input2>
              원
            </Input2Div>
          </RowTextDiv>
          <RowTextDiv style={{gap:" 0.4rem"}}>
            <GaryText>돌려받을 계좌</GaryText>
            <Input3Div>
              <FormControl
                sx={{
                  width: "8rem",
                  height: "3.2rem",
                  padding: "1rem",
                  paddingRight: "0",
                  paddingLeft: "0.3rem",
                  
                  margin: "0",
                  "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": { borderColor: "#E0E0E0" },
                    fieldset: { borderColor: "#E0E0E0", border: "none" },
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "1rem",
                    paddingRight: "0",
                    paddingLeft: "0",
                  },
                }}
              >
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  sx={{
                    width: "15rem",
                    height: "1rem",
                    padding: "0",
                    margin: "0",
                    
                  }}
                ></InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={form.bank}
                  onChange={(e) => setForm({ ...form, bank: e.target.value })}
                  autoWidth
                  label=""
                  MenuProps={MenuProps}
                  sx={{
                    padding: "0",
                    color: form.bank === "은행 선택" ? "#b3b3b3" : "#696969",
                    fontFamily: "Pretendard",
                    fontSize: form.bank === "은행 선택" ?" 0.75rem" : "1rem",
                    fontStyle: "normal",
                    fontWeight: form.bank === "은행 선택" ? "500" :"600",
                    lineHeight: 'normal',
                    width: "8rem",
                    textAlign: "end",
                    "& .MuiSelect-icon": {
                      display: "none",
                    },
                    "#demo-simple-select-autowidth": {
                      paddingRight: "0 !important",
                    },
                  }}
                >
                  <MenuItem value="은행 선택"
                  >은행 선택</MenuItem>
                  {banks.map((bank) => (
                    <MenuItem key={bank} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Input3
                type="text"
                placeholder="계좌번호"
                value={form.bankAccount}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    bankAccount: e.target.value.replace(/\D/, ""),
                  }))
                }
              ></Input3>
            </Input3Div>
          </RowTextDiv>
          <SaveButton
            disabled={isButtonDisabled}
            onClick={() => setModalShow(!modalShow)}
          >
            저장하기
          </SaveButton>
        </Form>
        <div id="modal"></div>
        {modalShow && (
          <Modal
            setModalShow={setModalShow}
            setNextStep={navigateToRequestdetail}
            content1="채무기록이 저장되었습니다."
            content2=""
            buttonContent="확인"
            close={false}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default WritingMessage;

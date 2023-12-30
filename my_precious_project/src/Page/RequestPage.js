import { useState, useEffect } from "react";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import AppHome from "../Components/App/App_Home_Components/AppHome";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../contexts/ThemeContext.js"; // Context APi 적용
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

/****  MUI Libraries  *****/
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RequestPage = () => {
  const [form, setForm] = useState({
    title: "",
    borrowMoney: "",
    payDate: "",
    situation: "",
    payWay: "",
    bank: "은행 선택",
    bankAccount: "",
  });
  const [active, setActive] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    // 모든 입력 필드의 변경 여부를 모니터링
    const fields = [
      form.title,
      form.borrowMoney,
      form.payDate,
      form.situation,
      form.payWay,
      form.bank,
      form.bankAccount,
    ];
    const originalFields = ["", "", "", "", "", "은행 선택", ""];

    const hasChanged = fields.every(
      (field, index) => field !== originalFields[index]
    );

    // console.log(hasChanged);

    setActive(hasChanged);
  }, [
    form.title,
    form.borrowMoney,
    form.payDate,
    form.situation,
    form.payWay,
    form.bank,
    form.bankAccount,
  ]);

  /*
	오늘 날짜 선택 부분
	*/
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const theme = useTheme();
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  const handleDateFormat = (originalDate) => {
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const day = originalDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}${month}${day}`;
    setForm({ ...form, payDate: formattedDate });
  };

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

  // focus를 위한 변수
  const [isInputFocused1, setIsInputFocused1] = useState(false);
  const [isInputFocused2, setIsInputFocused2] = useState(false);
  const [isInputFocused3, setIsInputFocused3] = useState(false);
  const [isInputFocused4, setIsInputFocused4] = useState(false);
  const [isInputFocused5, setIsInputFocused5] = useState(false);
  const [isInputFocused6, setIsInputFocused6] = useState(false);

  /***** 데이터 전송 *****/
  const handleSubmit = () => {
    console.log(form);
    axios
      .post(
        "http://172.18.140.44:8080/api/boards/hbsNHR1qz9erDBjFQUZpyHhrVRG3",
        {
          title: form.title,
          borrowMoney: form.borrowMoney,
          payDate: form.payDate,
          situation: form.situation,
          payWay: form.payWay,
          bank: form.bank,
          bankAccount: form.bankAccount,
        }
      )
      .then((response) => {
        console.log("요청데이터가 저장되었습니다.", response.data);
        // 서버에서의 응답을 처리
      })
      .catch((error) => {
        console.error("업로드 중 오류 발생:", error);
        // 오류 처리
      });
  };

  return (
    <>
      {isDesktopOrMobile === true ? (
        <div>
          <AppHome />
        </div>
      ) : (
        <Container>
          <MainImage
            src={process.env.PUBLIC_URL + "/img/RequestCharacter.svg"}
          ></MainImage>
          <MainText>
            친구에게 돈을 빌리는 것은 당연한 게 아니에요! <br />
            고마운 친구에게 예쁜말로 부탁해보는 건 어떨까요?
          </MainText>
          <InputTitle className={isInputFocused1 ? "focused" : ""}>
            <div>제목</div>
            <div className="container">
              <input
                type="text"
                placeholder="예시) 어머님 수술비가 위급합니다. 조금이라도 도와주세요.."
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                onFocus={() => setIsInputFocused1(true)}
                onBlur={() => setIsInputFocused1(false)}
              />
            </div>
          </InputTitle>
          <InputReason className={isInputFocused2 ? "focused" : ""}>
            <div>사유</div>
            <div className="container">
              <textarea
                type="text"
                placeholder="돈을 빌려야 하는 자세한 상황을 이야기 해주세요."
                onChange={(e) =>
                  setForm({ ...form, situation: e.target.value })
                }
                onFocus={() => setIsInputFocused2(true)}
                onBlur={() => setIsInputFocused2(false)}
              />
            </div>
          </InputReason>
          <InputMethod className={isInputFocused3 ? "focused" : ""}>
            <div>상환 계획</div>
            <div className="container">
              <textarea
                type="text"
                placeholder="돈을 언제, 어떻게 갚을 수 있는지? (워딩 수정)"
                onChange={(e) => setForm({ ...form, payWay: e.target.value })}
                onFocus={() => setIsInputFocused3(true)}
                onBlur={() => setIsInputFocused3(false)}
              />
            </div>
          </InputMethod>
          <InputFinanceInfo className={isInputFocused4 ? "focused" : ""}>
            <div>필요 금액</div>
            <div className="container">
              <input
                type="text"
                placeholder=""
                onChange={(e) =>
                  setForm({ ...form, borrowMoney: e.target.value })
                }
                value={addComma(form.borrowMoney) || ""}
                onFocus={() => setIsInputFocused4(true)}
                onBlur={() => setIsInputFocused4(false)}
              ></input>
              <div className="won">원</div>
            </div>
          </InputFinanceInfo>
          <InputDayInfo className={isInputFocused5 ? "focused" : ""}>
            <div>갚을 날짜</div>
            <div
              className="container"
              onFocus={() => setIsInputFocused5(true)}
              onBlur={() => setIsInputFocused5(false)}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ monthShort: `M` }}
              >
                <MobileDatePicker
                  onChange={(e) => {
                    handleDateFormat(e.$d);
                  }}
                  shouldDisableDate={(day) => {
                    return dayjs(dayjs(day).format(`YYYY-MM-DD`)).isBefore(
                      today
                    );
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root.Mui-focused": { color: "#FF3D00" },
                    "& .toolbar": {
                      color: "white",
                      backgroundColor: "#FF3D00",
                      "& .MuiTypography-root ": {
                        color: "white",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover > fieldset": { borderColor: "#E0E0E0" },
                      fieldset: { borderColor: "#E0E0E0", border: "none" },
                      borderRadius: "10px",
                    },
                    "& .MuiButton-text ": {
                      color: "#F95D44",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </InputDayInfo>
          <InputBankInfo className={isInputFocused6 ? "focused" : ""}>
            <div>받을 계좌</div>
            <div
              className="container"
              onFocus={() => setIsInputFocused6(true)}
              onBlur={() => setIsInputFocused6(false)}
            >
              <FormControl
                sx={{
                  width: "15rem",
                  height: "1rem",
                  padding: "0",
                  margin: "0",
                  "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": { borderColor: "#E0E0E0" },
                    fieldset: { borderColor: "#E0E0E0", border: "none" },
                    borderRadius: "10px",
                  },
                  "& .MuiSvgIcon-root": {
                    width: "0rem",
                    height: "0rem",
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
                  indicator
                >
                  <MenuItem value="은행 선택">은행 선택</MenuItem>
                  {banks.map((bank) => (
                    <MenuItem key={bank} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                type="text"
                placeholder="계좌 번호를 입력하세요."
                onChange={(e) =>
                  setForm({ ...form, bankAccount: e.target.value })
                }
              />
            </div>
          </InputBankInfo>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={active ? false : true}
          >
            요청하기
          </Button>
        </Container>
      )}
    </>
  );
};

const MainImage = styled.img`
  width: 8.4375rem;
  height: 20.25rem;
  flex-shrink: 0;
  position: absolute;
  top: 2.25rem;
  left: 20%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainText = styled.div`
  width: 43.375rem;
  font-family: Pretendard;
  color: #ff3d00;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: 2.75rem; /* 137.5% */
  text-align: left;
  margin-top: 5.87rem;
`;

const InputTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.25rem;
  width: 42.4375rem;
  height: 3.1875rem;
  position: relative;
  justify-content: center;
  align-items: center;
  .container:hover {
    border: 1px solid #ff3d00;
  }

  div {
    width: 4.875rem;
    color: rgba(105, 102, 102, 1);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem; /* 278.571% */
    margin: 0.37rem 0rem 0.37rem 0rem;
  }
  .container {
    width: 37.5625rem;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-family: Pretendard;
    margin-left: 1.31rem;
  }
  input {
    position: relative;
    box-sizing: border-box;
    width: 36.2525rem;
    height: 3.1875rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.625rem;
    background: #fff;
    font-family: Pretendard;
    margin-left: 1.31rem;

    &::placeholder {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #a5a5a5;
      font-family: Pretendard;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.4375rem; /* 278.571% */
      opacity: 1;
      /* margin-left: 1.31rem; */
      transition: top 0.3s, font-size 0.3s, opacity 0.3s;
    }
  }
  &.focused {
    .container {
      border: 1px solid #ff3d00;
    }
  }

  input:focus {
    margin-left: 1.31rem;
    outline: none;
    &::placeholder {
      top: 10px;
      opacity: 0;
    }
  }
`;

const InputReason = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.56rem;
  width: 42.4375rem;
  height: 7.9375rem;
  position: relative;
  justify-content: center;
  align-items: center;
  div {
    width: 4.875rem;
    color: rgba(105, 102, 102, 1);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem; /* 278.571% */
    margin: 0.37rem 0rem 0.37rem 0rem;
  }
  .container {
    display: flex;
    align-items: center;
    width: 37.5625rem;
    height: 7.9375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-family: Pretendard;
    margin-left: 1.31rem;
  }
  .container:hover {
    border: 1px solid #ff3d00;
  }
  textarea {
    box-sizing: border-box;
    width: 36.2525rem;
    height: 6.4rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #fff;
    border: none;
    /* padding: 0.9375rem 1.0625rem 0rem 0rem; */
    font-family: Pretendard;
    margin-left: 1.31rem;
    overflow-wrap: break-word; /* 텍스트가 영역을 벗어날 경우 줄바꿈 */
    word-wrap: break-word; /* IE 지원을 위해 추가 */
    white-space: pre-wrap; /* 공백 및 줄바꿈 유지 */
    resize: none; /*사용자에 의한 크기 조정 비활성화 */

    &::placeholder {
      position: absolute;
      top: 1rem;
      transform: translateY(-50%);
      color: #a5a5a5;
      font-family: Pretendard;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.4375rem; /* 278.571% */
      opacity: 1;
      transition: top 0.3s, font-size 0.3s, opacity 0.3s;
    }
  }
  &.focused {
    .container {
      border: 1px solid #ff3d00;
    }
  }
  textarea:focus {
    outline: none;
    &::placeholder {
      top: 0.625rem;
      opacity: 0;
    }
  }
`;

const InputMethod = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.56rem;
  margin-bottom: 3.5625rem;
  width: 42.4375rem;
  height: 5.3125rem;
  position: relative;
  justify-content: center;
  align-items: center;
  div {
    width: 4.875rem;
    color: rgba(105, 102, 102, 1);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem; /* 278.571% */
    margin: 0.375rem 0rem 0.375rem 0rem;
  }
  .container {
    display: flex;
    align-items: center;
    width: 37.5625rem;
    height: 5.3125rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-family: Pretendard;
    margin-left: 1.31rem;
  }
  .container:hover {
    border: 1px solid #ff3d00;
  }
  textarea {
    box-sizing: border-box;
    width: 36.2525rem;
    height: 5.3125rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #fff;
    border: none;
    padding: 0.9375rem 1.0625em 0.9375rem 0rem;
    font-family: Pretendard;
    margin-left: 1.31rem;
    overflow-wrap: break-word; /* 텍스트가 영역을 벗어날 경우 줄바꿈 */
    word-wrap: break-word; /* IE 지원을 위해 추가 */
    white-space: pre-wrap; /* 공백 및 줄바꿈 유지 */
    resize: none; /*사용자에 의한 크기 조정 비활성화 */

    &::placeholder {
      position: absolute;
      top: 30%;
      transform: translateY(-50%);
      color: #a5a5a5;
      font-family: Pretendard;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.4375rem; /* 278.571% */
      opacity: 1;
      transition: top 0.3s, font-size 0.3s, opacity 0.3s;
    }
  }
  &.focused {
    .container {
      border: 1px solid #ff3d00;
    }
  }
  textarea:focus {
    outline: none;
    &::placeholder {
      top: 0.625rem;
      opacity: 0;
    }
  }
`;

const InputDayInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.625rem;
  width: 42.4375rem;
  height: 2.4375rem;
  position: relative;
  justify-content: center;
  align-items: center;
  div {
    width: 4.875rem;
    color: rgba(105, 102, 102, 1);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem; /* 278.571% */
    margin: 0.375rem 0rem 0.375rem 0rem;
    /* top: 50%; */
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 37.5625rem;
    height: 2.4375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-family: Pretendard;
    /* margin-left: 1.31rem; */
  }
  .container:hover {
    border: 1px solid #ff3d00;
  }
  input {
    box-sizing: border-box;
    width: 33.8725rem;
    height: 2.4375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #fff;
    border: none;
    text-align: right;
    color: #a5a5a5;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 243.75% */
    margin-left: 1.74rem;
  }
  input:focus {
    outline: none;
  }
  &.focused {
    .container {
      border: 1px solid #ff3d00;
    }
  }
  .won {
    width: 1rem;
    margin: 0rem 2.69rem 0rem 0rem;
    color: #a5a5a5;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 243.75% */
  }
`;

const InputBankInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.625rem;
  width: 42.4375rem;
  height: 2.4375rem;
  position: relative;
  /* justify-content: center; */
  align-items: center;
  div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 52rem;
    color: rgba(105, 102, 102, 1);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem; /* 278.571% */
    margin: 0.375rem 0rem 0.375rem 0rem;
    /* top: 50%; */
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 37.5625rem;
    height: 2.4375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-family: Pretendard;
    margin-left: 1.31rem;
  }
  .container:hover {
    border: 1px solid #ff3d00;
  }
  input {
    position: relative;
    box-sizing: border-box;
    width: 18rem;
    height: 2.4375rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.625rem;
    background: #fff;
    font-family: Pretendard;
    /* text-align: right; */
    /* margin-left: 1.31rem; */
    &::placeholder {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #a5a5a5;
      font-family: Pretendard;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.4375rem; /* 278.571% */
      opacity: 1;
      /* margin-left: 1.31rem; */
      transition: top 0.3s, font-size 0.3s, opacity 0.3s;
    }
  }
  &.focused {
    .container {
      border: 1px solid #ff3d00;
    }
  }
  input:focus {
    margin-left: 1.31rem;
    outline: none;
    &::placeholder {
      top: 10px;
      opacity: 0;
    }
  }
`;

const InputFinanceInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.625rem;
  width: 42.4375rem;
  height: 2.4375rem;
  position: relative;
  justify-content: center;
  align-items: center;
  div {
    width: 4.875rem;
    color: rgba(105, 102, 102, 1);
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4375rem; /* 278.571% */
    margin: 0.375rem 0rem 0.375rem 0rem;
    /* top: 50%; */
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 37.5625rem;
    height: 2.4375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-family: Pretendard;
    /* margin-left: 1.31rem; */
  }
  .container:hover {
    border: 1px solid #ff3d00;
  }
  input {
    box-sizing: border-box;
    width: 33.8725rem;
    height: 2.4375rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #fff;
    border: none;
    text-align: right;
    color: #a5a5a5;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 243.75% */
    /* margin-left: 1.31rem; */
  }
  input:focus {
    outline: none;
  }
  &.focused {
    .container {
      border: 1px solid #ff3d00;
    }
  }
  .won {
    width: 1rem;
    margin: 0rem 2.69rem 0rem 0rem;
    color: #a5a5a5;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 243.75% */
  }
`;

const Button = styled.button`
  width: 43.375rem;
  height: 3.1875rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #ff3d00;
  margin-top: 0.81rem;
  color: white;
  border: 1px;
  &:disabled {
    background: #d9d9d9;
  }
`;

export default RequestPage;

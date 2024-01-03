import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import AppHome from '../../App/App_Home_Components/AppHome';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext.js'; // Context APi 적용
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../../contexts/userContext';
import Modal from '../Web_Login_Components/Modal/Modal.js';
import { auth } from '../../../API/firebaseAPI';

/****  MUI Libraries  *****/
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from '../Layout_Components/Mypage_header.js';
import LoginErrorPage from '../../../Page/LoginErrorPage.js';

const WebRequest = () => {
    const theme = useTheme();
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useUserData();
    const userName = userData.name;
    const uid = userData.uid;

    const [form, setForm] = useState({
        title: '',
        borrowMoney: '',
        payDate: '',
        situation: '',
        payWay: '',
        bank: '은행 선택',
        bankAccount: '',
    });
    const [active, setActive] = useState(false);
    const [check, setCheck] = useState(false);
    const [money, setMoney] = useState();
    const navigate = useNavigate();
    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        // 모든 입력 필드의 변경 여부를 모니터링
        const fields = [form.title, form.borrowMoney, form.payDate, form.situation, form.bank, form.bankAccount, check];
        const originalFields = ['', '', '', '', '', '은행 선택', '', false];

        const hasChanged = fields.every((field, index) => field !== originalFields[index]);
        setActive(hasChanged);
    }, [form.title, form.borrowMoney, form.payDate, form.situation, form.bank, form.bankAccount, check]);

    /*
	오늘 날짜 선택 부분
	*/
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);
    const [date, setDate] = useState(today);
    const [printDate, setPrintDate] = useState('');

    const handleDateFormat = (originalDate) => {
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
        const printedDate = `${year}년 ${month}월 ${day}일`;
        setPrintDate(printedDate);

        const formattedDate = `${year}${month}${day}`;
        setForm({ ...form, payDate: formattedDate });
    };

    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return returnString;
    };

    const onChangePoints = (e) => {
        // setForm({ ...form, borrowMoney: e.target.value });
        const { value } = e.target;
        let str = value.replaceAll(',', '');
        setForm({ ...form, borrowMoney: str });
        setMoney(str);
    };

    const banks = [
        '농협 은행',
        '카카오뱅크',
        '국민 은행',
        '신한 은행',
        '토스뱅크',
        '우리 은행',
        'IBK 기업 은행',
        '하나 은행',
        '새마을 은행',
        '부산 은행',
        '대구 은행',
        '케이뱅크',
        '신협 은행',
        '우체국 은행',
        '경남 은행',
        '광주 은행',
        '수협 은행',
        '전북 은행',
        '저축 은행',
        '제주 은행',
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
            .post(`http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v9/boards/${uid}`, {
                title: form.title,
                borrowMoney: form.borrowMoney,
                payDate: form.payDate,
                situation: form.situation,
                payWay: form.payWay,
                bank: form.bank,
                bankAccount: form.bankAccount,
            })
            .then((response) => {
                console.log('요청데이터가 저장되었습니다.', response.data);
                // 서버에서의 응답을 처리
            })
            .catch((error) => {
                console.error('업로드 중 오류 발생:', error);
                // 오류 처리
            });
    };

    const postDataAndToDashboard = () => {
        handleSubmit();
        navigate('/dashboard');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header backcolor={'#FFF'} />
                {userName != null ? (
                    <>
                        <ContentContainer>
                            <BackIcon
                                src={process.env.PUBLIC_URL + '/img/Icon_back.svg'}
                                onClick={postDataAndToDashboard}
                            ></BackIcon>
                            <MainContainer>
                                <TitleContainer>
                                    <MainImage src={process.env.PUBLIC_URL + '/img/RequestCharacter.svg'}></MainImage>
                                    <MainText>
                                        친구에게 돈을 빌리는 것은 당연한 게 아니에요!
                                        <br />
                                        예쁜 말로 정중히 부탁해보는 건 어떨까요?
                                    </MainText>
                                </TitleContainer>
                                <InputTitle className={isInputFocused1 ? 'focused' : ''}>
                                    <div className="title">제목</div>
                                    <div className="container">
                                        <input
                                            type="text"
                                            placeholder="예시) 어머님 수술비가 위급합니다. 조금이라도 도와주세요.."
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            onFocus={() => setIsInputFocused1(true)}
                                            onBlur={() => setIsInputFocused1(false)}
                                            maxLength="15"
                                        />
                                    </div>
                                </InputTitle>
                                <InputReason className={isInputFocused2 ? 'focused' : ''}>
                                    <div className="title">사유</div>
                                    <div className="container">
                                        <textarea
                                            type="text"
                                            placeholder="돈을 빌려야 하는 자세한 상황을 이야기 해주세요."
                                            onChange={(e) => setForm({ ...form, situation: e.target.value })}
                                            onFocus={() => setIsInputFocused2(true)}
                                            onBlur={() => setIsInputFocused2(false)}
                                        />
                                    </div>
                                </InputReason>
                                <InputFinanceInfo className={isInputFocused3 ? 'focused' : ''}>
                                    <div className="title">필요 금액</div>
                                    <div className="container">
                                        <input
                                            type="text"
                                            placeholder=""
                                            onChange={(e) => {
                                                onChangePoints(e);
                                            }}
                                            value={addComma(money)}
                                            onFocus={() => setIsInputFocused3(true)}
                                            onBlur={() => setIsInputFocused3(false)}
                                        ></input>
                                        <div className="won">원</div>
                                    </div>
                                </InputFinanceInfo>
                                <InputDayInfo className={isInputFocused4 ? 'focused' : ''}>
                                    <div className="title">갚을 날짜</div>
                                    <div
                                        className="container"
                                        onFocus={() => setIsInputFocused4(true)}
                                        onBlur={() => setIsInputFocused4(false)}
                                    >
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                            dateFormats={{ monthShort: `M` }}
                                        >
                                            <MobileDatePicker
                                                onChange={(e) => {
                                                    if (e == null) {
                                                        setForm({ ...form, payDate: form.payDate });
                                                    } else {
                                                        handleDateFormat(e.$d);
                                                    }
                                                }}
                                                shouldDisableDate={(day) => {
                                                    return dayjs(dayjs(day).format(`YYYY-MM-DD`)).isBefore(today);
                                                }}
                                                sx={{
                                                    width: '100%',
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#FF3D00',
                                                    },
                                                    '& .toolbar': {
                                                        color: 'white',
                                                        backgroundColor: '#FF3D00',
                                                        '& .MuiTypography-root ': {
                                                            color: 'white',
                                                        },
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover > fieldset': { borderColor: '#E0E0E0' },
                                                        fieldset: {
                                                            borderColor: '#E0E0E0',
                                                            border: 'none',
                                                        },
                                                        borderRadius: '10px',
                                                    },
                                                    '& .MuiButton-text ': {
                                                        color: '#F95D44',
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </InputDayInfo>
                                <InputBankInfo className={isInputFocused5 && isInputFocused6 ? 'focused' : ''}>
                                    <div className="title">받을 계좌</div>
                                    <div
                                        className="container1"
                                        onFocus={() => setIsInputFocused5(true)}
                                        onBlur={() => setIsInputFocused5(false)}
                                    >
                                        <FormControl
                                            sx={{
                                                width: '15rem',
                                                height: '1rem',
                                                padding: '0',
                                                margin: '0',
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover > fieldset': { borderColor: '#E0E0E0' },
                                                    fieldset: { borderColor: '#E0E0E0', border: 'none' },
                                                    borderRadius: '10px',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    width: '0rem',
                                                    height: '0rem',
                                                },
                                            }}
                                        >
                                            <InputLabel
                                                id="demo-simple-select-autowidth-label"
                                                sx={{
                                                    width: '15rem',
                                                    height: '1rem',
                                                    padding: '0',
                                                    margin: '0',
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
                                    </div>
                                    <div
                                        className="container2"
                                        onFocus={() => setIsInputFocused6(true)}
                                        onBlur={() => setIsInputFocused6(false)}
                                    >
                                        <input
                                            className="input2"
                                            type="text"
                                            placeholder="계좌 번호를 입력하세요."
                                            onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
                                        />
                                    </div>
                                </InputBankInfo>
                                <CheckContainer>
                                    <div className="title">서약</div>
                                    <p>
                                        나 {userName}(은)는 {printDate}까지 돈을 갚을 것을 약속합니다.
                                    </p>
                                    {check ? (
                                        <img
                                            className="checkbox"
                                            src={process.env.PUBLIC_URL + '/img/checkbox.svg'}
                                            onClick={(e) => setCheck(!check)}
                                        ></img>
                                    ) : (
                                        <img
                                            className="box"
                                            src={process.env.PUBLIC_URL + '/img/box.svg'}
                                            onClick={(e) => setCheck(!check)}
                                        ></img>
                                    )}
                                </CheckContainer>
                                <Button
                                    type="button"
                                    onClick={() => setModalShow(true)}
                                    // onClick={handleSubmit}
                                    disabled={active ? false : true}
                                >
                                    요청하기
                                </Button>
                                <div id="modal"></div>
                                {modalShow && (
                                    <Modal
                                        setModalShow={setModalShow}
                                        setNextStep={postDataAndToDashboard}
                                        content1="해당 글은 작성 완료 후 수정이 불가능합니다."
                                        content2="내용이 맞는지 확인해주세요."
                                        buttonContent="작성 완료"
                                        close={true}
                                    />
                                )}
                            </MainContainer>
                            <RightDiv></RightDiv>
                        </ContentContainer>
                    </>
                ) : (
                    <LoginErrorPage />
                )}
            </Container>
        </ThemeProvider>
    );
};

const ContentContainer = styled.div`
    width: 100%;
    height: 43.4375rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 7.81rem;
`;

const BackIcon = styled.img`
    width: 0.96875rem;
    height: 2.375rem;
    margin-right: 5.91rem;
    margin-top: 0.63rem;
`;
const RightDiv = styled.div`
    width: calc(0.96875rem + 5.91rem);
    height: 2.375rem;
`;

const MainContainer = styled.div`
    width: 47.0625rem;
    height: 43rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #fbfbfb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`;

const TitleContainer = styled.div`
    width: 100%;
    /* height: 6.75525rem; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
`;

const MainImage = styled.img`
    width: 6.75525rem;
    height: 6.75525rem;
    flex-shrink: 0;
    margin: 1.12rem 3.31rem 1.12rem 1.25rem;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    overflow-x: hidden;
`;

const MainText = styled.div`
    /* width: 29.5625rem; */
    color: rgba(255, 61, 0, 1);
    text-align: center;
    font-family: Pretendard;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.1875rem; /* 125% */
    letter-spacing: -0.0875rem;
`;

const InputTitle = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1.25rem;
    width: 42.4375rem;
    height: 2.4375rem;
    position: relative;
    justify-content: center;
    align-items: center;
    .container:hover {
        border: 1px solid #ff3d00;
    }

    div {
        width: 36.8125rem;
        height: 2.4375rem;
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
        height: 2.4375rem;
        flex-shrink: 0;
        border-radius: 0.625rem;
        border: 1px solid #e8e8e8;
        background: #fff;
        font-family: Pretendard;
        /* margin-left: 1.31rem; */
    }
    .title {
        color: #6a6a6a;
        margin-right: 3rem;
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4375rem; /* 243.75% */
    }
    input {
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        width: 36.2525rem;
        height: 2.4375rem;
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
    height: 8.5625rem;
    position: relative;
    justify-content: center;
    /* align-items: center; */
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
        height: 8.5625rem;
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
    .title {
        color: #6a6a6a;
        margin-right: 3rem;
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4375rem; /* 243.75% */
        margin-top: 1.12rem;
    }
    textarea {
        cursor: pointer;
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
        cursor: pointer;
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
    .title {
        color: #6a6a6a;
        margin-right: 0.06;
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4375rem; /* 243.75% */
    }
    input {
        cursor: pointer;
        box-sizing: border-box;
        width: 34rem;
        height: 2.4375rem;
        flex-shrink: 0;
        border-radius: 0.625rem;
        background: #fff;
        border: none;
        text-align: right;
        color: rgba(80, 79, 79, 1);
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
`;

const InputBankInfo = styled.div`
    display: flex;
    flex-direction: row;
    /* margin-bottom: 0.625rem; */
    width: 42.4375rem;
    height: 2.4375rem;
    position: relative;
    justify-content: center;
    align-items: center;
    div {
        display: flex;
        flex-direction: row;
        justify-content: right;
        width: 15rem;
        color: rgba(105, 102, 102, 1);
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4375rem; /* 278.571% */
        margin: 0.375rem 0rem 0.375rem 0rem;
        /* top: 50%; */
    }
    .container1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        width: 13.5rem;
        height: 2.4375rem;
        flex-shrink: 0;
        border-radius: 0.625rem;
        border: 1px solid #e8e8e8;
        background: #fff;
        font-family: Pretendard;
        margin-right: 0.75rem;
    }
    .container1:hover {
        border: 1px solid #ff3d00;
    }
    .container2 {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        width: 23.1875rem;
        height: 2.4375rem;
        flex-shrink: 0;
        border-radius: 0.625rem;
        border: 1px solid #e8e8e8;
        background: #fff;
        font-family: Pretendard;
        padding-right: 2.5rem;
    }
    .container2:hover {
        border: 1px solid #ff3d00;
    }
    .title {
        display: flex;
        flex-direction: row;
        justify-content: start;
        color: #6a6a6a;
        margin-right: 0.06rem;
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4375rem; /* 243.75% */
    }
    input {
        width: 22.1875rem;
        height: 2.4375rem;

        border: none;
        border-radius: 0.625rem;
        background: #fff;
        font-family: Pretendard;
        &::placeholder {
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
    ::placeholder {
        text-align: right;
        color: #999; /* 원하는 색상으로 수정 */
    }
    .input2 {
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        width: 20.4rem;
        height: 2rem;
        flex-shrink: 0;
        border: none;
        border-radius: 0.625rem;
        background: #fff;
        font-family: Pretendard;
        text-align: right;
        /* margin-left: 1.31rem; */
        &::placeholder {
            text-align: right;
            position: relative;
            top: 55%;
            /* right:  */
            transform: translateY(-100%);
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
    margin-top: 2.69rem;
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
    .title {
        color: #6a6a6a;
        margin-right: 0.06;
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4375rem; /* 243.75% */
    }
    input {
        cursor: pointer;
        box-sizing: border-box;
        width: 33.8725rem;
        height: 2.4375rem;
        flex-shrink: 0;
        border-radius: 0.625rem;
        background: #fff;
        border: none;
        text-align: right;
        color: rgba(80, 79, 79, 1);
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
        color: #696969;
        text-align: right;
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2.4375rem; /* 243.75% */
    }
`;

const Button = styled.button`
    cursor: pointer;
    width: 41.5625rem;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: #ff3d00;
    margin-top: 0.88rem;
    color: white;
    border: 1px;
    &:disabled {
        cursor: default;
        background: #d9d9d9;
    }
`;

const CheckContainer = styled.div`
    width: 90rem;
    height: 2.4375rem;
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    /* margin-bottom: 0.5rem; */
    justify-content: center;

    align-items: center;
    color: #a5a5a5;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4375rem; /* 216.667% */
    cursor: default;
    .title {
        width: 2rem;
        margin-right: 1rem;
    }
    p {
        /* width: 33.875rem; */
    }
    .checkbox {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 0.5rem;
        cursor: pointer;
    }
    .box {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 0.5rem;
        cursor: pointer;
    }
`;

const CloseButton = styled.img`
    position: absolute;
    top: 2.59rem;
    right: 2.59rem;
    width: 2.03881rem;
    height: 2.03881rem;
    cursor: pointer;
`;

export default WebRequest;

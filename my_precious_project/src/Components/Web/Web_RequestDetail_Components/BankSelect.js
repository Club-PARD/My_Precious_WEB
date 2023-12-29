import React, { useState } from 'react';
import Select from 'react-select';
//npm i react-select

const options = [
  { value: '농협 은행', label: '농협 은행' },
  { value: '카카오뱅크', label: '카카오뱅크' },
  { value: '국민 은행', label: '국민 은행' },
  { value: '신한 은행', label: '신한 은행' },
  { value: '우리 은행', label: '우리 은행' },
  { value: 'IBK기업 은행', label: 'IBK기업 은행' },
  { value: '하나 은행 ', label: '하나 은행 ' },
  { value: '새마을 은행', label: '새마을 은행' },
  { value: '부산 은행', label: '부산 은행' },
  { value: '대구 은행', label: '대구 은행' },
  { value: '케이뱅크', label: '케이뱅크' },
  { value: '신협 은행', label: '신협 은행' },
  { value: '우체국 은행', label: '우체국 은행' },
  { value: '경남 은행', label: '경남 은행' },
  { value: '광주 은행', label: '광주 은행' },
  { value: '수협 은행', label: '수협 은행' },
  { value: '전북 은행', label: '전북 은행' },
  { value: '저축 은행', label: '저축 은행' },
  { value: '제주 은행', label: '제주 은행' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: 0,
    width: '5rem',
    //color: "#B3B3B3",
    border:"none",
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: '2.4375rem',
    magin: 0,
    cursor: 'pointer'
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    padding: 0,
    magin: 0,
    width: '8rem',
    color: "#B3B3B3",
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: '2.4375rem',
    
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    color: "#B3B3B3",
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: '2.4375rem',
    magin: 0
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#FF3D00' : 'white', // 선택된 목록의 배경색만 변경
    color: state.isSelected ? 'white' : 'black', // 선택된 목록의 글자색만 변경
    '&:hover': {
        background: '#D9D9D9', // 호버 시 배경색 변경
        cursor: 'pointer',
      },
  }),
};

const BankSelect = ({ setSelectedBank }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedBank(selectedOption); // 선택된 값 상태 업데이트
  };

  return (
    <div >
      <Select
        defaultValue={selectedOption}
        onChange={handleSelectChange}
        options={options}
        styles={customStyles}
        isSearchable={false}
        placeholder="은행명" 
      />
    </div>
  );
}

export default BankSelect;
import React, { useState } from 'react';
import Select from 'react-select';
//npm i react-select

const options = [
  { value: 'KB국민', label: 'KB국민' },
  { value: '신한', label: '신한' },
  { value: 'NH농협', label: 'NH농협' },
  { value: '하나', label: '하나' },
  { value: '우리', label: '우리' },
  { value: 'IBK기업', label: 'IBK기업' },
  { value: '대구', label: '대구' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: 0,
    width: '3.75rem',
    //color: "#B3B3B3",
    border:"none",
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: '2.4375rem',
    magin: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    padding: 0,
    magin: 0,
    width: ' 6.25rem',
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
        background: '#FFA500', // 호버 시 배경색 변경
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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
//import { Link } from 'react-router-dom';
import { useTheme } from "../../../contexts/ThemeContext.js"; // Context APi 적용
import DisplayFriend from "./DisplayFriend.js";
import SummaryFriend from "./SummaryFriend.js";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  height: 19.9375rem;
  width: 22rem;
  align-items: start;
  background: #f1f1f1;
  overflow: auto;
`;

function ManageFriendList({ boardId, handleDisplayData }) {
  const theme = useTheme();

  // debtId, 이름, 금액  리스트에 저장
  const [lendData, setLendData] = useState([]);
  //버튼 선택 상태를 관리함
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://moneyglove-env.eba-xt43tq6x.ap-northeast-2.elasticbeanstalk.com/api/v23/debts/boards/${boardId}`
      )
      .then((response) => {
        console.log("데이터를 받아오는중: ", response);

        const debtDataArray = response.data.data || [];

        const numValues = debtDataArray.map((item, index) => {
          const num = debtDataArray[index];
          const numName = num.user.name;
          const numLendmoney = num.lendMoney;

          return {
            Debtid: num.id,
            Debtname: numName,
            DebtlendMoney: numLendmoney,
          };
        });

        setSelectedFriend(numValues.length > 0 ? numValues[0].Debtid : null);
        setLendData(numValues);
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류 발생: ", error);
        // 오류를 처리합니다.
      });
  }, [boardId]);

  useEffect(() => {
    // 초기 렌더링 시에 setGetdebtidShow에 디폴트 Debtid를 설정
    if (selectedFriend !== null) {
      handleFriendClick(selectedFriend);
    }
  }, [selectedFriend, handleDisplayData]);

  const handleFriendClick = (friendId) => {
    // setSelectedFriend(friendId === selectedFriend ? "" : friendId);
    setSelectedFriend(friendId);

    handleDisplayData(friendId);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {lendData.map((friend) => (
          <SummaryFriend
            key={friend.Debtid}
            name={friend.Debtname}
            money={friend.DebtlendMoney}
            isSelected={friend.Debtid === selectedFriend}
            onClick={() => handleFriendClick(friend.Debtid)}
          />
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default ManageFriendList;

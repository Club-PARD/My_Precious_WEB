import React, { useState, useEffect } from 'react';
import { Circle } from 'rc-progress';
import styled from 'styled-components';

function CircleProgressbar(props) {
  const [startValue, setStartValue] = useState(props.totalMoney);
  const [inputValue, setInputValue] = useState(props.debtMoney);
  const [percent, setPercent] = useState(0);

  const updatePercent = (newPercent) => {
    setPercent(newPercent);
  };

  useEffect(() => {
    const startPercent = 0;
    const endPercent = (inputValue / startValue) * 100;
    const duration = 1000;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentPercent = startPercent + progress * (endPercent - startPercent);

      updatePercent(currentPercent);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inputValue]);

  // 표시되는 백분율 결정
  const displayedPercent = percent > 100 ? 100 : percent;

  return (
    <div style={{ position: 'relative', paddingLeft: "5px" }}>
      <ListNumber        
        style={{
        position: 'absolute',
        top: '6%',
        left: '7%',
        transform: 'translate(-50%, -50%)',
        }}>1</ListNumber>
      <Circle
        percent={displayedPercent}
        strokeWidth={11}
        strokeColor="#FF3D00"
        trailWidth={11}
        trailColor="#DCDCDC"
      />
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <DisplayDiv>
          <DisplayPercentDiv >{Math.round(percent)}%</DisplayPercentDiv>
          <CollectText>모였어요.</CollectText>
        </DisplayDiv>
      </div>
    </div>

  );
}

const ListNumber = styled.div`
  color: #707070;

  font-family: PP Neue Machina;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const DisplayDiv =styled.div`
  text-align: center;
  height:36px;
`;

const DisplayPercentDiv = styled.div`
  color: #707070;
  font-family: PP Neue Machina;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`
const CollectText = styled.div`
  color: #707070;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default CircleProgressbar;

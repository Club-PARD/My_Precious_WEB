import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";
import styled from "styled-components";

function LineProgress(props) {
  // 현재 진행률 상태 변수
  const [percent, setPercent] = useState(0);

  // 진행률을 업데이트하는 함수
  const updatePercent = (newPercent) => {
    setPercent(newPercent);
  };

  useEffect(() => {
    // 시작 퍼센트는 0
    const startPercent = 0;
    // 종료 퍼센트는 입력 값에 따른 퍼센트
    const endPercent = (props.receive / props.total) * 100;

    // 애니메이션 지속 시간 (밀리초)
    const duration = 100 * endPercent;
    let startTime;
    let animationFrame;

    // 애니메이션 함수
    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      // 진행률 계산
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentPercent =
        startPercent + progress * (endPercent - startPercent);

      // 진행률 업데이트
      updatePercent(currentPercent);

      if (progress < 1) {
        // 애니메이션이 완료되지 않았으면 계속해서 프레임 요청
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // 애니메이션 시작
    animationFrame = requestAnimationFrame(animate);

    // 컴포넌트가 언마운트되면 애니메이션을 중지
    return () => cancelAnimationFrame(animationFrame);
  }, [props.receive]); // 입력 값이 변경될 때만 실행

  return (
    <Container>
      {/* 프로그레스 바 컴포넌트 */}
      <StyleProgressDiv
        percent={percent}
        strokeWidth={7}
        strokeColor="#FC511C"
        trailWidth={7}
        trailColor="#FAFAFA"
        strokeLinecap="butt"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const StyleProgressDiv = styled(Line)`
  border-radius: 0.5rem;
  border: 0.0625rem solid #e0e0e0;
  width: 39.25rem;
  height: 2.9375rem;
`;

export default LineProgress;

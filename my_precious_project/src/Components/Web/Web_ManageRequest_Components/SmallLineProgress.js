// SmallLineProgress.js

import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';

function SmallLineProgress({ total, receive }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const startPercent = 0;
    const endPercent = (receive / total) * 100;
    const duration = 100 *endPercent; // 원하는 애니메이션 지속 시간으로 수정

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentPercent = startPercent + progress * (endPercent - startPercent);

      setPercent(currentPercent);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [total, receive]);

  return (
    <Container>
      <StyleProgressDiv
        percent={percent}
        strokeWidth={1}
        strokeColor="#FC511C"
        trailWidth={1}
        trailColor="#E5E5E5"
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
  z-index: 2;
`;

const StyleProgressDiv = styled(Line)`
  border-radius: 0.5rem;
  width: 23.46875rem;
  height: 2.02531rem;
`;

export default SmallLineProgress;

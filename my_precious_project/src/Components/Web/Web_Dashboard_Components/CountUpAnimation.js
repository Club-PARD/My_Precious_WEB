import React, { useState, useEffect } from 'react';

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function CountUpAnimation({ end: endStr= '0', start: startStr = '0', duration = 1000 }) {
  const end = parseFloat(endStr.replace(/,/g, ''));
  const start = parseFloat(startStr.replace(/,/g, ''));
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    let currentNumber = start;

    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, frameRate, start, totalFrame]);

  return count.toLocaleString(); // 쉼표를 포함하여 숫자 표시
}

export default CountUpAnimation;

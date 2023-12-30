import React, { useState, useEffect } from 'react';

function customEaseOut(t) {
    const power = 20;
    const progress = 1 - Math.pow(1 - t, power);

    const adjustedProgress = 0.2 + progress * 0.8;

    return adjustedProgress;
}

function CountUpAnimation({ end: endStr = '0', start: startStr = '0', duration = 1000 }) {
    const end = parseFloat(typeof endStr === 'string' || endStr instanceof String ? endStr.replace(/,/g, '') : endStr);
    const start = parseFloat(
        typeof startStr === 'string' || startStr instanceof String ? startStr.replace(/,/g, '') : startStr
    );
    const [count, setCount] = useState(start);
    const frameRate = 0.5;
    const totalFrame = Math.round(duration / frameRate);

    useEffect(() => {
        let currentNumber = start;

        const counter = setInterval(() => {
            const progress = customEaseOut(++currentNumber / totalFrame);
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

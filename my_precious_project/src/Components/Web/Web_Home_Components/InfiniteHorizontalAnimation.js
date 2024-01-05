import React from 'react';
import styled, { keyframes } from 'styled-components';
import MoveText from '../../../Assets/img/MoveText.svg';

const moveAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0% 0;
  }
`;

const InfiniteHorizontalAnimationContainer = styled.div`
    width: 100%;
    overflow: hidden;
    background: url(${MoveText}); /* 이미지를 배경으로 사용 */
    background-size: 50% 100%;
    animation: ${moveAnimation} 10s linear infinite;
    padding-top: 20rem;
    position: relative;
    bottom: 0;
    left: 0;
`;

const InfiniteHorizontalAnimation = () => {
    return <InfiniteHorizontalAnimationContainer></InfiniteHorizontalAnimationContainer>;
};

export default InfiniteHorizontalAnimation;

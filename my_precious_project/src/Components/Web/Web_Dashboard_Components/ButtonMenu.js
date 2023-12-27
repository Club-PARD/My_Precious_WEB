import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

function ButtonMenu({ handleMenuChange }) {
    const [marginLeft, setMarginLeft] = useState(0);
    const [isMoving, setIsMoving] = useState(false);

    const handleClick = (newMargin) => {
        setIsMoving(true);
        setTimeout(() => {
            setMarginLeft(newMargin);
            handleMenuChange(newMargin); // 클릭된 메뉴에 따라 부모 컴포넌트에 알림
        }, 250);
        setTimeout(() => {
            setIsMoving(false);
        }, 750);
    };

    return (
        <Container>
            <StyledUl>
                <StyledLi onClick={() => handleClick(0)}>
                    <StyledA href="#">전체</StyledA>
                </StyledLi>
                <StyledLi onClick={() => handleClick(25)}>
                    <StyledA href="#">진행 중</StyledA>
                </StyledLi>
                <StyledLi onClick={() => handleClick(50)}>
                    <StyledA href="#">연체 중</StyledA>
                </StyledLi>
                <StyledLi onClick={() => handleClick(75)}>
                    <StyledA href="#">완료</StyledA>
                </StyledLi>
            </StyledUl>
            <StyledHr marginLeft={marginLeft} isMoving={isMoving} />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin-top: 40px;
    border-bottom: 1px solid #dcdcdc;
`;

const StyledUl = styled.ul`
    margin-bottom: 9px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-left: 0;
`;

const StyledLi = styled.li`
    display: flex;
    text-align: center;
    width: 25%;
`;

const StyledA = styled.a`
    display: inline-block;
    width: 100%;
    margin: 0;
    text-decoration: none;
    color: #333;
`;

const shrink = keyframes`
  0%, 100% {
    width: 25%;
  }
  50% {
    width: 10%;
  }
`;

const StyledHr = styled.hr`
    height: 4px;
    width: 25%;
    margin: 0;
    background: #ff3d00;
    border: none;
    transition: margin-left 1s cubic-bezier(0.23, 1, 0.32, 1);
    margin-left: ${(props) => props.marginLeft}%;

    ${(props) =>
        props.isMoving &&
        css`
            animation: ${shrink} 0.5s linear;
        `}
`;

export default ButtonMenu;

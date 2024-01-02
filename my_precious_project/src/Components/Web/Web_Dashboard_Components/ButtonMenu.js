import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Cash from '../../../Assets/img/Money.svg';

function ButtonMenu({ handleMenuChange, dataCounts }) {
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
                    <StyledButton href="#">
                        <MenuContainer>
                            <SameMenuName>전체</SameMenuName>
                            <SameMenuName>{dataCounts[0]}건</SameMenuName>
                        </MenuContainer>
                    </StyledButton>
                </StyledLi>
                <StyledLi onClick={() => handleClick(25)}>
                    <StyledButton href="#">
                        <MenuContainer>
                            <SameMenuName>진행 중</SameMenuName>
                            <SameMenuCount>{dataCounts[1]}건</SameMenuCount>
                        </MenuContainer>
                    </StyledButton>
                </StyledLi>
                <StyledLi onClick={() => handleClick(50)}>
                    <StyledButton href="#">
                        <MenuContainer>
                            <SameMenuName>연체 중</SameMenuName>
                            <SameMenuCount>{dataCounts[2]}건</SameMenuCount>
                        </MenuContainer>
                    </StyledButton>
                </StyledLi>
                <StyledLi onClick={() => handleClick(75)}>
                    <StyledButton href="#">
                        <MenuContainer>
                            <SameMenuName>완료</SameMenuName>
                            <SameMenuCount>{dataCounts[3]}건</SameMenuCount>
                        </MenuContainer>
                    </StyledButton>
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

const StyledButton = styled.button`
    display: inline-block;
    width: 100%;
    margin: 0;
    text-decoration: none;
    color: #333;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
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
const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SameMenuName = styled.div`
    color: #676767;
    font-weight: 600;
    font-size: 16px;
    margin-right: 13px;
`;
const SameMenuCount = styled.div`
    color: #494949;
    font-weight: 600;
    font-size: 16px;
`;
export default ButtonMenu;

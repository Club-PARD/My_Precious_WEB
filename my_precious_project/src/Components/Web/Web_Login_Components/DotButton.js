import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const DotRow = styled(Row)`
    width: 90px;
    height: 15px;
    flex-shrink: 0;
    justify-content: space-between;
`;

const DotBtn = styled.div`
    width: 14px;
    height: 15px;
    background-color: ${(props) => (props.bgcolor ? '#FF3D00' : '#D9D9D9')};
    border-radius: 50%;
    cursor: pointer;
`;

function DotButton(props) {
    const navigate = useNavigate();

    const handleDotClick = (dotColor) => {
        // Dot 버튼을 클릭했을 때의 처리
        switch (dotColor) {
            case 1:
                // 첫 번째 버튼을 클릭했을 때의 동작
                navigate('/Login/1');
                break;
            case 2:
                // 두 번째 버튼을 클릭했을 때의 동작
                navigate('/Login/2');
                break;
            case 3:
                // 세 번째 버튼을 클릭했을 때의 동작
                navigate('/Login/3');
                break;
            default:
                break;
        }
    };

    return (
        <DotRow>
            <DotBtn bgcolor={props.dotColor === 1} onClick={() => handleDotClick(1)}></DotBtn>
            <DotBtn bgcolor={props.dotColor === 2} onClick={() => handleDotClick(2)}></DotBtn>
            <DotBtn bgcolor={props.dotColor === 3} onClick={() => handleDotClick(3)}></DotBtn>
        </DotRow>
    );
}

export default DotButton;

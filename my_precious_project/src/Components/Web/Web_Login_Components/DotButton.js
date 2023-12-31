import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const DotRow = styled(Row)`
    width: 5.625rem;
    height: 0.9375rem;
    flex-shrink: 0;
    justify-content: space-between;
`;

const DotBtn = styled.div`
    width: 0.875rem;
    height: 0.9375rem;
    background-color: ${(props) => (props.bgcolor ? '#FF3D00' : '#D9D9D9')};
    border-radius: 50%;
    cursor: pointer;
`;

function DotButton(props) {
    const navigate = useNavigate();

    const handleDotClick = (dotColor) => {
        switch (dotColor) {
            case 1:
                // 첫 번째 버튼을 클릭했을 때의 동작
                if (props.dotColor !== 3) {
                    navigate('/Login/2');
                }
                break;
            case 2:
                // 두 번째 버튼을 클릭했을 때의 동작
                if (props.dotColor !== 3 && props.dotColor !== 1) {
                    navigate('/Login/3');
                }
                break;
            case 3:
                // 세 번째 버튼을 클릭했을 때의 동작
                if (props.dotColor === 1 || props.dotColor === 2) {
                    // 이미 세 번째 버튼이 눌러져 있는 경우에는 동작하지 않는다.
                    break;
                }
                navigate('/Login/4');
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

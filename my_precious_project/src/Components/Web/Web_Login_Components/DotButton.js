import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const DotRow =styled(Row)`
  width: 94.573px;
  height: 15.537px;
  flex-shrink: 0;
  justify-content: space-between;
`;

const DotBtn =styled.div`
  width: 14.86px;
  height: 15.54px;
  background-color: ${(props) => (props.bgcolor ? "#FF3D00" : "#D9D9D9")};
  border-radius: 50%;
`;

function DotButton(props) {
  
    return (
        <DotRow>
            <DotBtn bgcolor={props.dotColor === 1}></DotBtn>
            <DotBtn bgcolor={props.dotColor === 2}></DotBtn>
            <DotBtn bgcolor={props.dotColor === 3}></DotBtn>
        </DotRow>
    );
  };
  
  export default DotButton;
// TextFadeinAnimation.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    opacity: 0;
    transform: translateY(30px);
    transition: opacity ${(props) => props.fadeinTime}s, transform ${(props) => props.fadeinTime}s;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const TextFadeinAnimation = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, props.fadeinTime * 1000);

        return () => clearTimeout(timeout); // 컴포넌트가 unmount될 때 clearTimeout
    }, [props.fadeinTime]);

    return (
        <Container className={isVisible ? 'visible' : ''} fadeinTime={props.fadeinTime}>
            {props.children}
        </Container>
    );
};

export default TextFadeinAnimation;

import React, { useEffect, useState } from 'react';
import './Cursor.css'; // import the CSS

function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isActiveClickable, setIsActiveClickable] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        addEventListeners();
        handleLinkHoverEvents();
        return () => removeEventListeners();
    }, []);

    const addEventListeners = () => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseDown = () => {
        setIsActive(true);
    };

    const onMouseUp = () => {
        setIsActive(false);
    };

    const handleLinkHoverEvents = () => {
        document
            .querySelectorAll("a, input[type='submit'], input[type='image'], label[for], select, button, .link")
            .forEach((el) => {
                el.addEventListener('mouseover', () => setIsActiveClickable(true));
                el.addEventListener('mouseout', () => setIsActiveClickable(false));
            });
    };

    const cursorClasses = `cursor ${isActive ? 'clicked' : ''} ${isActiveClickable ? 'active' : ''} ${
        hidden ? 'hidden' : ''
    }`;

    return (
        <>
            <div
                id="cursor-dot"
                className={cursorClasses}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
            <div
                id="cursor-dot-outline"
                className={cursorClasses}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
        </>
    );
}

export default Cursor;

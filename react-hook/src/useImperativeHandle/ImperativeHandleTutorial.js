import React, { useRef } from "react";
import Button from "./Button";

function ImperativeHandle() {
    const buttonRef = useRef(null);
    const onClick = () => {
        buttonRef.current.alterToggle();
    }

    return (
        <div>
            <button onClick={onClick}>Buttom from parent</button>
            <Button ref={buttonRef}/>
        </div>
    );
}

export default ImperativeHandle
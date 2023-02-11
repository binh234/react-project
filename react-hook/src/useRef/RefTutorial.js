import React, { useState, useRef } from "react";

const RefTutorial = () => {
    const [inputValue, setInputValue] = useState("Home");
    const inputRef = useRef(null);

    const onClick = (e) => {
        console.log(inputRef.current.value);
        setInputValue(inputRef.current.value);
        inputRef.current.value = "";
        inputRef.current.focus();
    };

    return (
        <div>
            <h2>{inputValue}</h2>
            <div>
                <input placeholder="Ex..." ref={inputRef}/>
                <button onClick={onClick}>Change</button>
            </div>
        </div>
        
    )
}

export default RefTutorial;
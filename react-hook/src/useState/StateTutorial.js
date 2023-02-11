import React, { useState } from "react";

const StateTutorial = () => {
    const [counter, setCounter] = useState(0);
    const [inputValue, setInputValue] = useState("Home");

    const increment = () => {
        setCounter(counter => counter + 1);
    };
    const onChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <div>State {counter}</div>
            <button onClick={increment}>Increment</button>
            <div>
                <input placeholder="Enter something here" onChange={onChange} />
                {inputValue}
            </div>
        </div>
        
    )
}

export default StateTutorial;
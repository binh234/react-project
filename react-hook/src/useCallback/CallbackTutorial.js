import { useState, useCallback } from "react";
import Child from "./Child";

const CallbackTutorial = () => {
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState("Hello");

    const returnComment = useCallback((name) => {
        return data + name;
    }, [data]);

    return (
        <div>
            <Child returnComment={returnComment}/>

            <button onClick={() => {setToggle(!toggle)}}>Toggle</button>
            {toggle && <h3>Toggle</h3>}
        </div>
    )
}

export default CallbackTutorial;
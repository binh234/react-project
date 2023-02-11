import React, {useState, createContext} from "react";
import Login from "./Login";
import User from "./User";

export const AppContext = createContext(null);

const ContextTutorial = () => {
    const [username, setUsername] = useState("");

    return (
        <AppContext.Provider value={{username, setUsername}}>
            <Login/>
            <User/>
        </AppContext.Provider>
    )
}

export default ContextTutorial;
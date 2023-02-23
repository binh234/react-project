import React, { useContext, useState, useEffect } from "react";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const AuthContext = React.createContext();

// Export authentication context with the entrire app
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      setUser(user);
      setLoading(false);
      if (user) {
        console.log("redirect");
        navigate('/chat');
      }
    });
  }, [user, navigate]);

  const value = { user };

  // Other components can access user authentication from value
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
};

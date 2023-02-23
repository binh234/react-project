import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatEngine } from "react-chat-engine";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const auth = getAuth(app);

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLogout = async () => {
    await auth.signOut();
    console.log("logout succesfully");
    navigate("/");
  };

  // Fetch user avatar from the internet
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    // Logout if no authenticated user
    if (!user) {
      navigate("/");
      return;
    }

    // Get user's chat session through ChatEngine
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          // Display the key/value pairs
          // for(var pair of formData.entries()) {
          //   console.log(pair[0]+ ', '+ pair[1]); 
          // }

          // Create new user
          axios
            .post("https://api.chatengine.io/users/", formData, {
              headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, navigate]);

  if (!user) {
    return "loading...";
  }

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chat;

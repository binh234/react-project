import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Unichat!</h2>
        <div
          className="login-button google"
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          <GoogleOutlined /> Sign in with Google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() => signInWithRedirect(auth, facebookProvider)}
        >
          <FacebookOutlined /> Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;

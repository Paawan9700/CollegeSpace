import React, { useState } from "react";
import axios from "axios";
import tick from "../static/tick.png";
import cross from "../static/cross.png";
import "../styles/LoginForm.css";

const LoginForm = ({ isShowLogin, setIsShowLogin, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAnimation, setLoginAnimation] = useState(0);
  const Login = async () => {
    await axios
      .post("http://localhost:5000/api/auth", {
        email,
        password,
      })
      .then((res) => {
        window.sessionStorage.setItem("x-auth-token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.userId);
        window.sessionStorage.setItem("email", email);
        window.sessionStorage.setItem("name", res.data.name);
        setIsLoggedIn(true);
        setLoginAnimation(1);
        setTimeout(() => {
          setLoginAnimation(0);
          setIsShowLogin(false);
        }, 1500);
      })
      .catch(() => {
        setLoginAnimation(2);
        setTimeout(() => {
          setLoginAnimation(0);
        }, 1500);
      });
  };

  return (
    <div className={`form-box solid login-form ${isShowLogin ? "active" : ""}`}>
      <form className="form">
        <h1 className="login-text">Log In</h1>
        <label>Email</label>
        <br></br>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="login-box"
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-box"
        />
        <br></br>
        <input
          type="button"
          value="LOGIN"
          onClick={Login}
          className="login-btn"
        />
      </form>
      {loginAnimation === 1 ? (
        <div className="login-checkbox">
          <img alt="success" className="login-successful" src={tick}></img>
          <h3 className="login-successful-text">Login Successful</h3>
        </div>
      ) : loginAnimation === 2 ? (
        <div className="login-checkbox">
          <img alt="failure" className="login-successful" src={cross}></img>
          <h3 className="login-successful-text">Login Unsuccessful</h3>
        </div>
      ) : null}
    </div>
  );
};

export default LoginForm;

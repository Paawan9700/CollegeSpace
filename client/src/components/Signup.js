import React, { useState } from "react";
import axios from "axios";
import tick from "../static/tick.png";
import cross from "../static/cross.png";

import "../styles/LoginForm.css";

const SignupForm = ({ isShowSignup, setIsShowSignup, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginAnimation, setLoginAnimation] = useState(0);

  const handleSignup = async () => {
    console.log("signup is clicked")
    await axios
      .post("http://localhost:5000/api/users", {
        name,
        email,
        password,
      })
      .then((res) => {
        
        
        window.sessionStorage.setItem("x-auth-token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.userId);
        window.sessionStorage.setItem("email", email);
        window.sessionStorage.setItem("name", name);

        setLoginAnimation(1);
        setIsLoggedIn(true);
        setTimeout(() => {
          setLoginAnimation(0);
          setIsShowSignup(false);
        }, 1500);
      })
      .catch((e) => {
        console.log(e);
        setLoginAnimation(2);
        setTimeout(() => {
          setLoginAnimation(0);
        }, 1500);
      });
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className={`form-box login-form ${isShowSignup ? "active" : ""}`}>
      <form className="form">
        <h1 className="login-text">Welcome To CollegeSpace</h1>
        <label>Name</label>
        <br></br>
        <input
          type="text"
          onChange={onChangeName}
          className="login-box"
        />
        <br></br>
        <label>Email</label>
        <br></br>
        <input
          type="text"
          onChange={onChangeEmail}
          className="login-box"
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="password"
          onChange={onChangePassword}
          className="login-box"
        />
        <br></br>
        <input
          type="button"
          value="SIGN UP"
          onClick={handleSignup}
          className="login-btn"
        />
      </form>
      {loginAnimation === 1 ? (
        <div className="login-checkbox">
          <img alt="success" className="login-successful" src={tick}></img>
          <h3 className="login-successful-text">Signup and Login Successful</h3>
        </div>
      ) : loginAnimation === 2 ? (
        <div className="login-checkbox">
          <img alt="failure" className="login-successful" src={cross}></img>
          <h3 className="login-successful-text">Singup Unsuccessful</h3>
        </div>
      ) : null}
    </div>
  );
};

export default SignupForm;

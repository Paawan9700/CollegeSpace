import React from "react";
import Search from "./Search";
import "../styles/Nav.css";
import avatar from "../static/avatar.png";
import logo from "../static/lnmiit.png";
const Nav = ({
  handleLoginClick,
  handleSignupClick,
  articles,
  setArticles,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const handleClickLogin = () => {
    handleLoginClick();
  };
  const handleClickSignup = () => {
    handleSignupClick();
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.sessionStorage.clear();
  };
  return (
    <div className="nav">
      <div className="logo">
        <img src={logo} alt="" style={{ height: "60px" }} />
      </div>
      <Search articles={articles} setArticles={setArticles} />

      <div>
        {!isLoggedIn ? (
          <div className="log">
            <button
              type="button"
              onClick={handleClickLogin}
              className="loginicon"
            >
              LogIn
            </button>
            <button
              type="button"
              onClick={handleClickSignup}
              className="loginicon"
            >
              SignUp
            </button>
          </div>
        ) : (
          <div className="log">
            <img src={avatar} className="avatar" alt="avatar" />
            <button type="button" onClick={handleLogout} className="loginicon">
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

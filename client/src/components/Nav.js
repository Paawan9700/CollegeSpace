import React from "react";
import Search from "./Search";
import "../styles/Nav.css";
import avatar from "../static/avatar.png";
import logo from "../static/lnmiit.png";

import { Link } from 'react-router-dom'
// react uses Link-to to render to a different page without actually refreshing it

const Nav = (props) => {

  // destructuring all components passing in props (functions as well as variables)
  const { handleLoginClick, handleSignupClick, articles, setArticles, isLoggedIn, setIsLoggedIn } = props;


  // arrow functions to handle all clicks on buttons
  const handleClickLogin = () => {
    handleLoginClick();
  };

  const handleClickSignup = () => {
    handleSignupClick();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    ////??????? what basically this thing is doing (window.sessionStorage.clear())
    // i guess auth token is being deleted
    window.sessionStorage.clear();
  };


  return (
    <div className="nav">

      {/* showing our college logo here on the left top corner of the page */}
      <div className="logo">
        <img src={logo} alt="" style={{ height: "60px" }} />
      </div>

      {/* different routes to render to a different page */}
      <Link to='/addPaper'>
        <button>
          Add Paper
        </button> </Link>
      <Link to='/previousYearPapers'>
        <button>
          Previous Year Papers
        </button>
      </Link>

      {/* ????? pending to elborate */}
      <Search articles={articles} setArticles={setArticles} />

      <div>
        {/* if the user is not logged in then we are able to see two buttons (namely login and signup) 
        clickling on thse two buttons will provide my with some functionality */}
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
          {/* if the user is logged in then in that case logout button will be shown in the navbar */}
          {/* image is shown of someone to show that if the user is logged in or not */}
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

// exporting Nav component so that it can be used in other files as well
export default Nav;
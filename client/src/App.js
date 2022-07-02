import { useState } from "react";
import "./App.css";

// Adding components
import Nav from "./components/Nav";
import Feed from "./components/Feed";
import AddQuestion from "./components/AddQuestion";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/Signup";

function App() {

  // using useState hook to change the function or variable by passing them as props
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowSignup, setIsShowSignup] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);
  const [articles, setArticles] = useState([]);

  // whenever auth token is there saved in the browser so automaticlly isLoggedIn become true or false
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.sessionStorage.getItem("x-auth-token") ? true : false
  );


  // handle login click to make sure when to show the login form
  const handleLoginClick = () => {
    // ?????? i guess this is useless
    if (!isShowLogin) {
      setIsShowSignup(false);
    }

    // as soon as the login button is clicked that login form will showed and unshowed accordingly
    if (isShowLogin === false) {
      setIsShowLogin(true);
    } else {
      setIsShowLogin(false);
    }
  };


  const handleSignupClick = () => {
    if (!isShowSignup) {
      setIsShowLogin(false);
    }

    // as soon as the sign up button is clicked that signup form will appear and disappear accordingly
    if (isShowSignup === false) {
      setIsShowSignup(true);
    } else {
      setIsShowSignup(false);
    }

  };

  const handleAddNewQuestion = () => {
    console.log(newQuestion);
    setNewQuestion((newQuestion) => !newQuestion);
  };


  return (
    <div className="App">
      {/* Nav component and props as well  */}
      <Nav
        // passing all things as props in nav component
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
        articles={articles}
        setArticles={setArticles}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Login Form and it props */}
      <LoginForm
      // passing all things as props in LoginForm component
        isShowLogin={isShowLogin}
        // isShowLogin has a boolean value (be it true or false)

        setIsShowLogin={setIsShowLogin}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* signup form and its props */}
      <SignupForm
        isShowSignup={isShowSignup}
        // isShowSignup has a boolean value (be it true or false)
    
        setIsShowSignup={setIsShowSignup}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <div className="main-page">
        <Sidebar setArticles={setArticles} />
        <div className="content">
        {/* to add a new question */}
          <AddQuestion
            handleAddNewQuestion={handleAddNewQuestion}
            isShowSignup={isShowSignup}
            setIsShowSignup={setIsShowSignup}
          />
          <Feed
            newQuestion={newQuestion}
            articles={articles}
            setArticles={setArticles}
            isShowSignup={isShowSignup}
            setIsShowSignup={setIsShowSignup}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

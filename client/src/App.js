import { useState } from "react";
import "./App.css";
// Adding components
import Feed from "./components/Feed";
import Nav from "./components/Nav";
import AddQuestion from "./components/AddQuestion";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/Signup";

function App() {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowSignup, setIsShowSignup] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.sessionStorage.getItem("x-auth-token") ? true : false
  );
  const handleLoginClick = () => {
    if (!isShowLogin) {
      setIsShowSignup(false);
    }
    setIsShowLogin(!isShowLogin);
  };
  const handleSignupClick = () => {
    if (!isShowSignup) {
      setIsShowLogin(false);
    }
    setIsShowSignup(!isShowSignup);
  };
  const handleAddNewQuestion = () => {
    setNewQuestion((newQuestion) => !newQuestion);
  };
  return (
    <div className="App">
      <Nav
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
        articles={articles}
        setArticles={setArticles}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <LoginForm
        isShowLogin={isShowLogin}
        setIsShowLogin={setIsShowLogin}
        setIsLoggedIn={setIsLoggedIn}
      />
      <SignupForm
        isShowSignup={isShowSignup}
        setIsShowSignup={setIsShowSignup}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="main-page">
        <Sidebar articles={articles} setArticles={setArticles} />
        <div className="content">
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

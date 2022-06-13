import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/Article.css";
import upArrow from "../static/up-arrow.png";
import downArrow from "../static/down-arrow.png";
import Answer from "./Answer";
const Article = ({
  key,
  question,
  user,
  title,
  questionBody,
  tags,
  votes,
  deleteQuestion,
  setDeleteQuestion,
  isShowSignup,
  setIsShowSignup,
}) => {
  const [answerNow, setAnswerNow] = useState(false);
  const [answerBody, setAnswer] = useState("");
  const [expand, setExpand] = useState(false);
  const [newAnswers, setNewAnswers] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [username, setUsername] = useState("");

  const token = window.sessionStorage.getItem("x-auth-token");

  const submitAnswerHandler = async () => {
    let votes = 0;
    await axios
      .post(
        "http://localhost:5000/api/answers",
        {
          question,
          answerBody,
          votes,
        },
        {
          headers: { "x-auth-token": token },
        }
      )
      .then(() => {
        setNewAnswers(!newAnswers);
        setExpand(true);
      })
      .catch(() => setIsShowSignup(true));
  };

  const DeleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/questions/${question}`, {
        headers: { "x-auth-token": token },
      })
      .then(() => setDeleteQuestion(!deleteQuestion));
  };

  const VoteHandler = async (req) => {
    await axios
      .post(
        `http://localhost:5000/api/questions/${question}/act`,
        {
          action: req.target.className,
        },
        {
          headers: { "x-auth-token": token },
        }
      )
      .then((res) => {
        setCurrentVotes(res.data.votes);
      })
      .catch(() => {
        setIsShowSignup(true);
      });
  };

  useEffect(() => {
    async function getAnswersHandler() {
      const answers = await axios.get(
        `http://localhost:5000/api/answers/${question}`
      );
      setAllAnswers(answers);
    }
    getAnswersHandler();

    async function getUsername() {
      await axios.get(`http://localhost:5000/api/users/${user}`).then((res) => {
        setUsername(res.data.name);
      });
    }
    getUsername();
  }, [newAnswers, question, user]);
  const ExpandHandler = () => {
    setExpand(!expand);
  };
  const AnswerHandler = () => {
    setAnswerNow(!answerNow);
  };

  return (
    <div key={key} className="article">
      <div className="article-body">
        <h5>{username}</h5>
        <div className="article-question">
          <h4 className="title-text">
            <span>Question.</span> {title}
          </h4>
          <div className="article-buttons">
            <button className="answer-question" onClick={AnswerHandler}>
              Answer
            </button>
            {user === window.sessionStorage.getItem("userId") ? (
              <button className="delete-question" onClick={DeleteHandler}>
                Delete
              </button>
            ) : null}

            <div className="votes">
              <button className="upvote-btn" onClick={VoteHandler}>
                <img alt="upvote" className="upvote" src={upArrow}></img>
              </button>

              <button className="downvote-btn" onClick={VoteHandler}>
                <img alt="downvote" className="downvote" src={downArrow}></img>
              </button>
              <h3 className="counter">{currentVotes}</h3>
            </div>
          </div>
        </div>
        <h5 className="body-text">
          <span>Description.</span> {questionBody}
          <span className="expand" onClick={ExpandHandler}>
            &nbsp;&nbsp;&nbsp;...(more answers)
          </span>
        </h5>
        <div className="article-tags">
          <span className="tag">Tags. &nbsp;&nbsp;</span>
          {tags.map((tag) => (
            <h5>{tag} &nbsp;&nbsp;</h5>
          ))}
        </div>
        <h5>Answers</h5>
      </div>
      {answerNow ? (
        <form className={`answer-box ${answerNow ? "active" : ""}`}>
          <textarea
            type="text"
            className="answer-input"
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer"
          />
          <button
            type="button"
            className="submit-answer"
            onClick={submitAnswerHandler}
          >
            Submit
          </button>
        </form>
      ) : null}

      <div className="answers">
        {expand ? (
          allAnswers.data.map((answer) => (
            <Answer answerBody={answer.answerBody} answerUserId={answer.user} />
          ))
        ) : allAnswers.data && allAnswers.data.length > 0 ? (
          <Answer
            answerBody={allAnswers.data[0].answerBody}
            answerUserId={allAnswers.data[0].user}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Article;

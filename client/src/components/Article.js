import axios from "axios";

import React, { useState, useEffect } from "react";
import "../styles/Article.css";

// images of upvaote and downvote
import upArrow from "../static/up-arrow.png";
import downArrow from "../static/down-arrow.png";
import Answer from "./Answer";

const Article = (props) => {

  // destructuring 
  const { key, question, user, title, questionBody, tags, votes, deleteQuestion, setDeleteQuestion, setIsShowSignup,isAdmin } = props

  const host = "http://localhost:5000"

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
        `${host}/api/answers`,
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
    const questionToBeDeleted = question;
    await axios
      .delete(`${host}/api/questions/${questionToBeDeleted}`, {
        headers: { "x-auth-token": token },
      })
      .then(() => setDeleteQuestion(!deleteQuestion));
  };

  const VoteHandler = async (userAction) => {
    const questionToBevoted = question;
    await axios
      .post(
        `${host}/api/questions/${questionToBevoted}/action`,
        {
          actionTaken: userAction.target.className,
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

  const accessHandler = async (userAction)=>{
    const questionsTOAccept = question;
    await axios
          .post(`${host}/api/questions/${questionsTOAccept}/accept`,
          {
            actionTaken: userAction.target.className,
          },
          {
            headers: { "x-auth-token": token },
          }
          )
          .then((res)=>{
            
          })
          .catch(err=>{
            
          })
  }

  useEffect(() => {
    async function getAnswersHandler() {
      const answers = await axios.get(
        `${host}/api/answers/${question}`
      );
      setAllAnswers(answers);
    }
    getAnswersHandler();

    async function getUsername() {
      const userId = user;
      // making an API call to the user name with this particular userId
      await axios.get(`${host}/api/users/${userId}`).then((res) => {
        setUsername(res.data.name);
      });
    }
    getUsername();
  }, [newAnswers, question, user]);

  const ExpandHandler = () => {
    setExpand(!expand);
  };

  const AnswerHandler = () => {
    if (answerNow === true) {
      setAnswerNow(false);
    }
    else {
      setAnswerNow(true);
    }
  };

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  }


  return (
    <div key={key} className="article">
      <div className="article-body">

        {/* the name if the user who entered this question */}
        <h5>Question written By - {username}</h5>
        <hr></hr>
        <div className="article-question">
          <h4 className="title-text">
            <span>Question.</span> {title}
          </h4>
          <div className="article-buttons">
          {!isAdmin ?
            <button className="answer-question" onClick={AnswerHandler}>
              Want To Answer
            </button>
            :
            (
              null
            )
            }
            {user === window.sessionStorage.getItem("userId") ? (
              <button className="delete-question" onClick={DeleteHandler}>
                Delete
              </button>
            ) : null}

            {
              !isAdmin 
              ?
              (
                <div className="votes">
                  <button className="upvote-btn" onClick={VoteHandler}>
                    <img alt="upvote" className="upvote" src={upArrow}></img>
                  </button>

                  <button className="downvote-btn" onClick={VoteHandler}>
                    <img alt="downvote" className="downvote" src={downArrow}></img>
                  </button>

                  <h3 className="counter">{currentVotes}</h3>
                </div>
              ) 
              :
              (
                  <div className="accept-post">
                     <button className="accept-btn" onClick={accessHandler}>
                        Accept
                      </button>
                    <button className="deny-btn" onClick={accessHandler}>
                      Deny
                    </button>
                  </div> 
              )
            }
          </div>
        </div>

        <h5 className="body-text">
          <span>Description.</span> {questionBody}

        </h5>
        <div className="article-tags">
          <span className="tag">Tags. &nbsp;&nbsp;</span>
          {tags.map((tag) => (
            <h5>{tag} &nbsp;&nbsp;</h5>
          ))}
        </div>

        <hr></hr>
          {!isAdmin && <span>All related Answers:</span>}
        <span className="expand" onClick={ExpandHandler}>
          &nbsp;&nbsp;&nbsp;(View All answers)
        </span>
      </div>
      {answerNow &&!isAdmin? (
        <form className={`answer-box ${answerNow ? "active" : ""}`}>
          <textarea
            type="text"
            className="answer-input"
            onChange={handleAnswer}
            placeholder="Write your relevant answer"
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
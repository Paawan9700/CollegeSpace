import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/Article.css";
const Answer = ({ answerBody, answerUserId }) => {
  const [answerUsername, setAnswerUsername] = useState("");

  const host = "http://localhost:5000";
  useEffect(() => {
    async function getUsername() {
      await axios
        .get(`${host}/api/users/${answerUserId}`)
        .then((res) => {
          setAnswerUsername(res.data.name);
        });
    }
    getUsername();
  });

  return (
    <div className="answer">
      <h5>Answer By - {answerUsername}</h5>
      <p className="answer-body">{answerBody}</p>
    </div>
  );
};
export default Answer;

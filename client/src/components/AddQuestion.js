import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/AddQuestion.css";

const AddQuestion = ({
  handleAddNewQuestion,
  isShowSignup,
  setIsShowSignup,
}) => {
  const [title, setTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const titleRef = useRef(null);
  const questionBodyRef = useRef(null);
  const questionTagsRef = useRef(null);

  const questionHandler = async () => {
    const token = window.sessionStorage.getItem("x-auth-token");
    var votes = 0;
    const tags = questionTags.split(" ");
    axios
      .post(
        "http://localhost:5000/api/questions",
        {
          title,
          questionBody,
          tags,
          votes,
        },
        {
          headers: { "x-auth-token": token },
        }
      )
      .then(() => {
        setTitle("");
        setQuestionBody("");
        setQuestionTags("");
        titleRef.current.value = "";
        questionBodyRef.current.value = "";
        questionTagsRef.current.value = "";
        handleAddNewQuestion();
      })
      .catch((e) => {
        setIsShowSignup(!isShowSignup);
      });
  };
  return (
    <div className="add-question">
      <form className="question-form">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="title"
          ref={titleRef}
          placeholder="Ask a question..."
        />
        <textarea
          type="text"
          onChange={(e) => setQuestionBody(e.target.value)}
          className="question-body"
          ref={questionBodyRef}
          placeholder="Explain your question..."
        />
        <input
          type="text"
          onChange={(e) => setQuestionTags(e.target.value)}
          className="tags"
          ref={questionTagsRef}
          placeholder="Enter question tags with space b/w each tag"
        />

        <button type="button" onClick={questionHandler} className="ask-button">
          Ask
        </button>
      </form>
    </div>
  );
};
export default AddQuestion;

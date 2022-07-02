// useRef used to reference something
import React, { useState, useRef } from "react";

// axios is used to make HTTP request from node.js
import axios from "axios";
import "../styles/AddQuestion.css";

const AddQuestion = (props) => {

  // destructuring from props;
  const { handleAddNewQuestion, isShowSignup, setIsShowSignup } = props;


  const [title, setTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const titleRef = useRef(null);
  const questionBodyRef = useRef(null);
  const questionTagsRef = useRef(null);

  const host = 'http://localhost:5000'

  const questionHandler = async () => {
    const token = window.sessionStorage.getItem("x-auth-token");

    // initializing votes of a newly added question to be zero
    // data type is var becoz these are changing timely
    var votes = 0;

    const tags = questionTags.split(" ");
    // post request is being made on API -> /api/questions
    axios
      .post(
        `${host}/api/questions`,
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
        // after making a new question everything now will be initialised with empty
        setTitle("");
        setQuestionBody("");
        setQuestionTags("");
        titleRef.current.value = "";
        questionBodyRef.current.value = "";
        questionTagsRef.current.value = "";
        handleAddNewQuestion();
      })
      .catch((e) => {
        // if any kind of error occurs it is being cathced here
        //??????????? after isShowSignup is made true or false then after that how it is showing that signup form
        if (isShowSignup === true) {
          setIsShowSignup(false);
        }
        else {
          setIsShowSignup(true);
        }
      });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleQuestionBody = (e) => {
    setQuestionBody(e.target.value);
  }

  const handleQuestionTags = (e) => {
    setQuestionTags(e.target.value);
  }

  return (
    <div className="add-question">
      <form className="question-form">

        <input
          type="text"
          onChange={handleTitle}
          className="title"
          ref={titleRef}
          placeholder="Ask a question...?"
        />

        <textarea
          type="text"
          onChange={handleQuestionBody}
          className="question-body"
          ref={questionBodyRef}
          placeholder="Explain your question..."
        />

        <input
          type="text"
          onChange={handleQuestionTags}
          className="tags"
          ref={questionTagsRef}
          placeholder="Enter question tags with space b/w each tag..."
        />

        <button type="button" onClick={questionHandler} className="ask-button">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
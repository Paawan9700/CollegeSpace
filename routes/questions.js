const { Question, validate } = require("../models/question");
// Question model and validate function is taken from the file
// so that desired changes can be made into the database taking into considertion the validation 
// of the question that the uset has just entered

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
// auth middleware is used wherever authentication is being required

const _ = require("lodash");

// route 1  -> to display all the already written questions sorted by date (/api/questions)
router.get("/", async (req, res) => {

  try {
    const questions = await Question.find().sort("createdAt");
    // recent added questions should be at the top
    questions.reverse();
    res.send(questions);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }

});

// route 2 -> adding a new question (/api/questions) -> authentication is required
router.post("/", auth, async (req, res) => {

  // the question details entered by the user should first be validated
  // if it is validated according to the all validation checks
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // destructuring things from req.body
    const { title, questionBody, votes, tags } = req.body;

    let question = new Question({
      user: req.user._id,
      title: title,
      questionBody: questionBody,
      votes: votes,
      tags: tags,
    });

    question = await question.save();
    res.send(question);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// route 3 -> /api/questions/subject -> login is required
// this route is helping in filtering the questionsbased on the categories(or tags)
router.get("/:subject", async (req, res) => {

  try {
    const questions = await Question.find().sort("createdAt");
    questions.reverse();

    // after questions are filtered they are to be returned in the sorted basis
    console.log(req.params.subject);

    if (req.params.subject == "All") {
      // if the tag is ALL then return all questions in sorted manner
      res.send(questions);
    } else {
      // now filtering out all the desired questions
      let filteredQuestions = [];
      questions.map((question) => {
        // The indexOf() method returns the position of the first occurrence of a value in a string.
        if (question.tags.indexOf(req.params.subject) !== -1) {
          filteredQuestions.push(question);
        }
      });
      res.send(filteredQuestions);
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// route 4 -> 
router.get("/:searchText/search", async (req, res) => {
  const questions = await Question.find().sort("createdAt");
  questions.reverse();

  let filteredQuestions = [];
  questions.map((question) => {
    if (
      question.title
        .split(" ")
        .map((v) => v.toLowerCase())
        .some((item) =>
          req.params.searchText
            .split(" ")
            .map((v) => v.toLowerCase())
            .includes(item)
        ) ||
      question.questionBody
        .split(" ")
        .map((v) => v.toLowerCase())
        .some((item) =>
          req.params.searchText
            .split(" ")
            .map((v) => v.toLowerCase())
            .includes(item)
        ) ||
      question.tags
        .map((v) => v.toLowerCase())
        .some((item) =>
          req.params.searchText
            .split(" ")
            .map((v) => v.toLowerCase())
            .includes(item)
        )
    ) {
      filteredQuestions.push(question);
    }
  });
  res.send(filteredQuestions);
});


// route 5 -> /api/questions/id
// this route is ued to update the particular question
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  if (!question)
    return res.status(404).send("The question with the given Id doesnt exist");

  res.send(question);
});


// route 6 -> /api/questions/quesid -> login required
// this route is used to delete a particular question
router.delete("/:quesid", auth, async (req, res) => {
  try {
    const question = await Question.findByIdAndRemove(req.params.quesid);
    // taking out the question having that particular id
    if (!question)
      return res.status(404).send("The question with the given Id doesnt exist");
    res.send(question);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});


// route 7 -> /api/questions/quesid/action
// this route is used to upvote or downvote the particular question
router.post("/:quesid/action", auth, async (req, res, next) => {

  try {
    const actionOnButton = req.body.actionTaken;
    // console.log(actionOnButton);
    const counter = (actionOnButton === "upvote-btn" || actionOnButton === 'upvote') ? 1 : -1;
    let question = await Question.findById(req.params.quesid).catch((error) =>
      console.log(error)
    );

    if (!question)
      return res.status(404).send("The question with the given Id doesnt exist..");

    question.votes += counter;
    question = await question.save().catch((error) => console.log(error));
    res.send(question);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;

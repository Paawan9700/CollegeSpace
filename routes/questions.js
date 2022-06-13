const { Question, validate } = require("../models/question");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const questions = await Question.find().sort("createdAt");
  questions.reverse();
  res.send(questions);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let question = new Question({
    user: req.user._id,
    title: req.body.title,
    questionBody: req.body.questionBody,
    votes: req.body.votes,
    tags: req.body.tags,
  });

  question = await question.save();
  res.send(question);
});

router.get("/:subject", async (req, res) => {
  const questions = await Question.find().sort("createdAt");
  questions.reverse();
  console.log(questions);
  console.log(req.params.subject);
  if (req.params.subject == "All") res.send(questions);
  else {
    let filteredQuestions = [];
    questions.map((question) => {
      if (question.tags.indexOf(req.params.subject) !== -1) {
        filteredQuestions.push(question);
      }
    });
    res.send(filteredQuestions);
  }
});

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

router.delete("/:id", auth, async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);
  if (!question)
    return res.status(404).send("The question with the given Id doesnt exist");
  res.send(question);
});

router.post("/:id/act", auth, async (req, res, next) => {
  const action = req.body.action;
  const counter = action === "upvote" || action === "upvote-btn" ? 1 : -1;
  let question = await Question.findById(req.params.id).catch((e) =>
    console.log(e)
  );
  if (!question)
    return res.status(404).send("The question with the given Id doesnt exist");
  question.votes += counter;
  question = await question.save().catch((e) => console.log(e));
  res.send(question);
});

module.exports = router;

const { Answer, validate } = require("../models/answer");

const { Question } = require("../models/question");

const express = require("express");
const router = express.Router();

// auth being middleware here
const auth = require("../middleware/auth");

// route 1 -> get all the answers
router.get("/", async (req, res) => {
  const answers = await Answer.find().sort("createdAt");
  answers.reverse();
  res.send(answers);
});

// route 2 -> saving the answer entered by the user into the database
router.post("/", auth, async (req, res) => {

  // firstly validation is being done
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const foundquestion = await Question.findById(req.body.question);
  if (!foundquestion) return res.status(400).send("Invalid question");

  // destructuring
  const {answerBody, votes, question} = req.body;

  // making a new answer to be saved
  let answer = new Answer({
    answerBody: answerBody,
    votes: votes,
    user: req.user._id,
    question: question,
  });
  answer = await answer.save();
  res.send(answer);
});

router.get("/:id", async (req, res) => {
  const answers = await Answer.find({ question: req.params.id });
  if (!answers)
    return res.status(404).send("The answer with the given Id doesnt exist");
  res.send(answers);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const answer = await Answer.findByIdAndUpdate(
    req.params.id,
    { answerBody: req.body.answerBody },
    { new: true }
  );
  if (!answer)
    return res.status(404).send("The answer with the given Id doesnt exist");

  res.send(answer);
});

router.delete("/:id", auth, async (req, res) => {
  const answer = await Answer.findByIdAndRemove(req.params.id);
  if (!answer)
    return res.status(404).send("The answer with the given Id doesnt exist");
  res.send(answer);
});

router.post("/:id/act", auth, async (req, res) => {
  const action = req.body.action;
  const counter = action === "Like" ? 1 : -1;
  let answer = await Answer.findById(req.params.id);
  if (!answer)
    return res.status(404).send("The answer with the given Id doesnt exist");
  answer.votes += counter;
  answer = await answer.save();
  res.send(answer);
});
module.exports = router;

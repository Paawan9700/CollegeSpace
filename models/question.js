const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    questionBody: {
      type: String,
      required: true,
      maxlength: 500,
    },
    tags: {
      type: Array,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    user: Joi.objectId(),
    title: Joi.string().min(2).max(50).required(),
    questionBody: Joi.string().min(2).max(500).required(),
    votes: Joi.number(),
    tags: Joi.array(),
  });
  const validation = schema.validate(question);
  return validation;
}

exports.Question = Question;
exports.validate = validateQuestion;

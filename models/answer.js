const mongoose = require("mongoose");
const Joi = require("joi");

const answerSchema = new mongoose.Schema(
  {
    // reference must be a user to make sure that which user has added this questions
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // question as reference that this user belong to which question
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    answerBody: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Answer = mongoose.model("Answer", answerSchema);

function validateAnswer(answer) {
  const schema = Joi.object({
    answerBody: Joi.string().required(),
    user: Joi.objectId(),
    votes: Joi.number(),
    question: Joi.objectId().required(),
  });
  const validation = schema.validate(answer);
  return validation;
}

exports.Answer = Answer;
exports.validate = validateAnswer;

const mongoose = require("mongoose");
const Joi = require("joi");

// new schema desiging
const questionSchema = new mongoose.Schema(
  {
    // user is a foreign key states that which user has entered this particular question
    // or this question is belong to which user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      maxlength: 500,
      // trim actually removes all the white spaces (e.g. "   hello  "  -> "hello") 
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
  // mongoose automaticlly give "CreatedAt" and "UpdatedAt" functionality whenever a user adds the question
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    user: Joi.objectId(),
    title: Joi.string().min(2).max(500).required(),
    questionBody: Joi.string().min(2).max(500).required(),
    // this should be a number
    votes: Joi.number(),
    // Specifying that this should be an array
    tags: Joi.array(),
  });
  const validation = schema.validate(question);
  return validation;
}

// exporting all functions and model
exports.Question = Question;
exports.validate = validateQuestion;

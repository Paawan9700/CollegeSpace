const mongoose = require("mongoose");
const Joi = require("joi");

const jwt = require("jsonwebtoken");

// schema designing (blue print of a user)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    // all emails should be unique  
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});


userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    // ????????
    { _id: this._id, isAdmin: this.isAdmin },
    // jwt uses private key to sign when a new user signup
    process.env.APP_JWT_PK
  );
  return token;
};

// making User model using that userSchema
const User = mongoose.model("User", userSchema);

// used for validation when a new user is entered (alternative -> express-validator)
// function validateUser(user) {
//   // validateUser taking user as parameter to validate this particular user
//   const schema = Joi.object({
//     // required -> this field is required , max(size) -> max length allowed, string -> datatype
//     name: Joi.string().max(50).required(),
//     email: Joi.string().max(255).required().email(),
//     password: Joi.string().max(255).required(),
//     isAdmin: Joi.boolean(),
//   });

//   return schema.validateUser(user);
// }

// export User model to use this in other files as well
exports.User = User;

// so this validateuser function is exported outside this file and can be used anywhere to validate user
// exports.validate = validateUser;

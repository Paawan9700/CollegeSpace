const jwt = require("jsonwebtoken");
// jwt used to share security information between two parties ->(client and server)
// and provides a token that is actually stored in client's browser and that token is signed by an encrypted algorithm
// so that it can not be altered after the token is issued.


const Joi = require("joi");
// joi is used for data validation that ensures the data entered by the user
// is valid and following al validation boundaries(some checks while entering user data)

const bcrypt = require("bcrypt");
// for password hashing becoz password can not be saved as it is becoz if somehow database is leaked 
// users password should be kept encrypted

const _ = require("lodash");

// for validation
const { body, validationResult } = require('express-validator');

const { User } = require("../models/user");
// taking User model from the different file so that different functions can be performed on User model

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


// route-1 
router.get("/", async (req, res) => {
  // displaying all users sorted according to their name
  const users = await User.find().sort("name");
  res.send(users);
});

// route-2 -> login route -> /api/auth   (no login required)
router.post("/", [
  body('email', 'Please Enter a valid email').isEmail(),
  body('password', 'password cnanot be blank').exists()
], async (req, res) => {

  const errors = validationResult(req);
  // if there are errors return bad request and the errors as well
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // destructuring req.body (taking whatever user has entered)
    const { email, password } = req.body;

    // find the usee with this email is there in our database or not
    let user = await User.findOne({ email: email });

    // means an invalid user is trying to login
    if (!user) return res.status(400).send("please try with correct credentials (Invalid email or password)");

    const validPassword = await bcrypt.compare(password, user.password);
    // this bycrypt method is provided so that entered password can be compared with the already hashed password in the database
    if (!validPassword) return res.status(400).send("please try with correct credentials (Invalid email or password)");

    // new tokens can be generated every time but the information that token is containing will be remain same 
    const token = user.generateAuthToken();
    const name = user.name;
    res.send({ token: token, name: name, userId: user._id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }

});


// function validate(req) {
//   const schema = Joi.object({
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//   });

//   return schema.validate(req);
// }
module.exports = router;

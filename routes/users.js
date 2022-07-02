const auth = require("../middleware/auth");
// auth is the middle ware used to authenticate a user to give access to the desired things

const bcrypt = require("bcrypt");
// used for pass-word hashing

const _ = require("lodash");


// for validation
const { body, validationResult } = require('express-validator');

const { User } = require("../models/user");
// User modal and validate functiontaken from the models (validate function for user validation and User model
// so that desired changes can be made on the user database)

const express = require("express");
const router = express.Router();

// route 1 -> getting the user having a valid auth token  (/api/auth/me)
// authentication is required in this step
// auth is the middle-ware 
router.get("/me", auth, async (req, res) => {

  // try and catch statement to avoid any external error
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }

});

// route 2  -> getting the user who has entered this question
router.get("/:userId", async (req, res) => {
  try {

    // req.params.ques will give me the user id that which user belong to this particular question
    // after taking out the user  and sending the user as response
    const user = await User.findById(req.params.userId);
    res.send({ name: user.name, email: user.email });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});



// route-3 ->  signup a new user (/api/users) -> no login required
// that why auth middle-ware is not used here (new user is there)
router.post("/", [
  body('email', 'Please Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Min Password should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {

  // if there are errors then return a bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  
  try {

    const { email, password } = req.body;

    let user = User.findOne({ email: email });
    // ????? why user.email rather user can also be used
    if (user.email) return res.status(400).send("User already registered..");

    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    // salt is used just to make our password stronger
    user.password = await bcrypt.hash(user.password, salt);
    // password hashing

    await user.save();
    // token is being generated when ever a new user signed up
    // so that the token is being used to validate user again
    const token = user.generateAuthToken();
    res.send({ token: token, userId: user._id });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});


module.exports = router;

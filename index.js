const express = require("express");
const app = express();

// using mongoose to connect to mongoDB
const mongoose = require("mongoose");

// mainly user for data or (input) validation
const Joi = require("joi");

// ????
Joi.objectId = require("joi-objectid")(Joi);

// acquiring all the routes from the routes file
const questions = require("./routes/questions");
const answers = require("./routes/answers");
const users = require("./routes/users");
const auth = require("./routes/auth");

const cors = require("cors");
const path = require("path");

// .env is used to store keys and secrets. It is not pushed to your repo 
//i.e. github or bitbucket or anywhere you store your code. In that way it is not exposed.
require("dotenv").config();

const { APP_USER, APP_USER_PASSWORD } = process.env;

// mongoose being a driver user to connect our web application from the mongoDB
mongoose
  .connect(
    `mongodb://localhost/playground`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB succesfully.."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

// ?????
mongoose.set("useFindAndModify", false);

// all the routes using that mentioned routes (e.g.  questions, answers, users, auth etc)
app.use("/api/questions", questions);
app.use("/api/answers", answers);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/file", require("./routes/files"));

// taking backend port to be 5000
const port = process.env.PORT || 5000;

// ?????? 
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("CollegeSapce listening to port 5000"));

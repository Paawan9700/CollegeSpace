const path = require("path");
const express = require("express");
const File = require("../models/file");
require("dotenv").config();
const Router = express.Router();
var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
const { APP_AWSAccessKeyId, APP_AWSSecretKey, APP_S3Bucket } = process.env;

var s3 = new aws.S3({
  accessKeyId: APP_AWSAccessKeyId,
  secretAccessKey: APP_AWSSecretKey,
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "fileuploadvishwas",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log(req);
      console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { semester, branch, subject, extension } = req.body;
      const { location, mimetype } = req.file;
      console.log(semester, branch, subject, extension, mimetype);
      const name = `${branch}_${semester}_${subject}_${Date.now()}.${extension}`;
      console.log(name);
      const file = new File({
        name: name,
        semester,
        branch,
        subject,
        extension,
        file_path: location,
        file_mimetype: mimetype,
      });

      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      console.log(error);
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);

Router.get("/getAllFiles", async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.send(file.file_path);
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

module.exports = Router;

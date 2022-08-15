const path = require("path");

const express = require("express");

// File modal is taken
const File = require("../models/file");

// to access some secret key
require("dotenv").config();
const Router = express.Router();

var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
// multer is a kind of middleware for handelling uploadation of files
// aws-s3 -> amazon simple storage service is basically a cloud storage area used to store files and 
// any kind of metadata

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
    // cb -> callback
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

// used for uploading a single file
const singleUpload = upload.single("file");

// route 1 -> to upload file to the server : login is required (/api/file/upload)
Router.post("/upload", singleUpload, async (req, res) => {

  try {
    // destructuring
    const { semester, branch, subject, extension } = req.body;

    // mimetype -> format of a document
    // ????? how req.file and how that name came
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
    console.log(error.message);
    res.status(500).send("some error occured while uploading file. Please try after some time..");
  }
},
  (error, req, res, next) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);


// route 2 -> getting all the uploaded files from the database
Router.get("/getAllFiles", async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error while getting list of files. Try again later.");
  }
});

// route 3 ->  downloading files from the already present files
Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.send(file.file_path);
  } catch (error) {
    res.status(500).send("Error while downloading file. Try again later.");
  }
});

module.exports = Router;

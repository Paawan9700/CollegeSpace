const mongoose = require("mongoose");

// bluprint that what a file actually gonna contains
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    extension: {
      type: String,
      trim: true,
    },
    file_path: {
      type: String,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);
module.exports = File;

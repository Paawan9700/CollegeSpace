import React, { useState } from "react";
import axios from "axios";
import "../styles/PreviousYearPapers.scss";
// import { Link, useLocation } from "react-router-dom";

const API_URL = "http://localhost:5000/api/file";

const PaperCard = ({ id, branch, semester, subject, mimetype }) => {
  const [errorMsg, setErrorMsg] = useState("");

  console.log(errorMsg);
  const downloadFile = async (path) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`);
      setErrorMsg("");
      const link = document.createElement("a");

      link.href = result.data;
      const filename = `${branch}_${subject}_${semester}_${id}.p`;
      link.setAttribute("download", { filename });
      link.click();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };
  return (
    <div className="card mx-2 my-2 px-4 py-4">
      <div className="card-body">
        <h5 className="card-title">{subject}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {branch} - Semester {semester}
        </h6>
        <button className="btn btn-secondary" onClick={downloadFile}>
          Download
        </button>
      </div>
    </div>
  );
};

export default PaperCard;

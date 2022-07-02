import React, { useState, useEffect } from "react";
import PaperFilters from "../components/PaperFilters";
import PreviousYearPapers from "../components/PreviousYearPapers";
import axios from "axios";
const API_URL = "http://localhost:5000/api/file";

const Papers = () => {
  const [allFilesList, setAllFilesList] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [semester, setSemester] = useState(0);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg("");
        setFilesList(data);
        setAllFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);
  
  useEffect(() => {
    filter();
    // eslint-disable-next-line
  }, [branch, semester, subject]);

  const filter = () => {
    console.log(semester, branch, subject);

    if (semester !== 0 && branch !== "" && subject !== "") {
      const filteredFilesList = allFilesList.filter((file) => {
        return (
          file.semester === semester &&
          file.branch === branch &&
          file.subject === subject
        );
      });
      setFilesList(filteredFilesList);
    }
  };

  return (
    <div class="d-flex flex-col">
      <PaperFilters
        semester={semester}
        branch={branch}
        subject={subject}
        setSemester={setSemester}
        setBranch={setBranch}
        setSubject={setSubject}
      />
      <PreviousYearPapers filesList={filesList} errorMsg={errorMsg} />
    </div>
  );
};

export default Papers;

import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import {Row, Col} from "react-bootstrap";

// the common url to be used every where
const API_URL = "http://localhost:5000/api/file";

const AddPaper = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [semester, setSemester] = useState(0);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [allSemesterSubjects, setAllSemesterSubjects] = useState([]);

  const allSubjects = [
    [],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      },
    ],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ],
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ], 
    [
      {
        CSE: ["A", "B", "C", "D"],
        CCE: ["E", "F", "G", "H"],
        ECE: ["I", "J", "K", "L"],
        ME: ["M", "N", "O", "P"],
      }
    ]
  ];

  const handleOnSubmit = async (event) => {
    alert("your Notes / Paper has been added!")
    event.preventDefault();
    console.log(file);
    try {
      if (subject !== "" && semester !== 0 && branch !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("semester", semester);
          formData.append("subject", subject);
          formData.append("branch", branch);
          formData.append("extension", file.name.split(".").slice(-1)[0]);

          setErrorMsg("");
          await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          props.history.push("/list");
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const subjectsHandler = (branchPass) => {
    const subjectList = [];

    console.log(branchPass);
    console.log(semester);

    if (branchPass && semester !== 0){
      for (let i = 0; i < allSubjects[semester][0][branchPass].length; i++) {
        subjectList.push(
          <li className="dropdown-item" onClick={subjectHandler}>
            {allSubjects[semester][0][branchPass][i]}
          </li>
        );
      }
    }
    setAllSemesterSubjects(subjectList);
  };

  const semesterHandler = (choosenSemester) => {
    setSemester(parseInt(choosenSemester.target.outerText[9]));
    // subjectsHandler(choosenSemester.target.outerText);
    // console.log(choosenSemester.target.outerText);
  };

  const branchHandler = (choosenBranch) => {
    setBranch(choosenBranch.target.outerText);
    subjectsHandler(choosenBranch.target.outerText);
  };

  const subjectHandler = (e) => {
    setSubject(e.target.outerText);
  };


  return (
    <div>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <div className="d-flex flex-row justify-content-evenly">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="navbarDropdown2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {semester === 0 ? "Select Semester" : "Semester " + semester}
          </button>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
            {/* all semester all listed here */}
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 1
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 2
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 3
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 4
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 5
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 6
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 7
            </li>
            <li className="dropdown-item" onClick={semesterHandler}>
              Semester 8
            </li>
          </ul>

          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="navbarDropdown3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {branch.length > 0 ? branch : "Select Branch"}
          </button>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
            <li className="dropdown-item" onClick={branchHandler}>
              CSE
            </li>
            <li className="dropdown-item" onClick={branchHandler}>
              CCE
            </li>
            <li className="dropdown-item" onClick={branchHandler}>
              ECE
            </li>
            <li className="dropdown-item" onClick={branchHandler}>
              ME
            </li>
          </ul>

          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="navbarDropdown1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {subject.length > 0 ? subject : "Select Subject"}
          </button>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
            {allSemesterSubjects}
          </ul>
        </div>

        <div className="upload-section my-4">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>


          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}


        </div>
        <Button variant="primary" type="submit">
          Add Notes / Paper
        </Button>
      </Form>
    </div>
  );
};

export default AddPaper;

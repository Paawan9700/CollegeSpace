import React from "react";
import "../styles/PreviousYearPapers.scss";
import PaperCard from "./PaperCard";
import { Link } from "react-router-dom";
// import Nav from "./Nav";

const PreviousYearPapers = (props) => {

  // destructuring
  const {filesList, errorMsg} = props;

  return (
    <div>
      <div className="d-flex flex-row w-100">
        <div>
          <Link to="/addPaper">
            <button type="button" className="btn btn-secondary">
              Add Paper
            </button>
          </Link>

          <div className="files-container d-flex flex-row flex-wrap">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            {filesList.length > 0 ? (
              filesList.map(
                (file) => (
                  <PaperCard
                    id={file._id}
                    branch={file.branch}
                    subject={file.subject}
                    semester={file.semester}
                    file_path={file.file_path}
                    file_mimetype={file.file_mimetype}
                  />
                )
              )
            ) : (
              <tr>
                <td colSpan={3} style={{ fontWeight: "300" }}>
                  Nothing Uploaded Yet relevant to your choise.
                </td>
              </tr>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviousYearPapers;

// {
//   _id,
//   subject,
//   branch,
//   semester,
//   file_path,
//   file_mimetype,
// }
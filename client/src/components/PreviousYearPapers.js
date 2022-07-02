import React from "react";
import "../styles/PreviousYearPapers.scss";
import PaperCard from "./PaperCard";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const PreviousYearPapers = ({ filesList, errorMsg }) => {
  return (
    <div>
      <Nav />
      <div className="d-flex flex-row w-100">
        <div>
          <Link to="/addPaper">
            <button type="button" class="btn btn-secondary">
              Add Paper
            </button>
          </Link>

          <div className="files-container d-flex flex-row flex-wrap">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            {filesList.length > 0 ? (
              filesList.map(
                ({
                  _id,
                  subject,
                  branch,
                  semester,
                  file_path,
                  file_mimetype,
                }) => (
                  <PaperCard
                    id={_id}
                    branch={branch}
                    subject={subject}
                    semester={semester}
                    file_path={file_path}
                    file_mimetype={file_mimetype}
                  />
                )
              )
            ) : (
              <tr>
                <td colSpan={3} style={{ fontWeight: "300" }}>
                  No files found. Please add some.
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

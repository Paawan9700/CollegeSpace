import React, { useState } from "react";
const Sidebar = ({
  branch,
  subject,
  semester,
  setSemester,
  setBranch,
  setSubject,
}) => {
  const [allSemesterSubjects, setAllSemesterSubjects] = useState([]);

  const allSubjects = [
    [],
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
      },
    ],
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
      },
    ],
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
      },
    ],
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
      },
    ]
  ];

  const semesterHandler = (e) => {
    setSemester(parseInt(e.target.id[16]));
    subjectsHandler(branch, e.target.id[16]);
  };

  const branchHandler = (e) => {
    setBranch(e.target.id);
    subjectsHandler(e.target.id, semester);
  };

  const subjectsHandler = (branchPass, semesterPass) => {
    const subjectList = [];
    if (branchPass && semesterPass !== 0)
      for (
        let i = 0;
        i < allSubjects[semesterPass][0][branchPass].length;
        i++
      ) {
        subjectList.push(
          <li className="list-group-item py-1 d-flex flex-col">
            <input
              class="form-check-input pointer"
              type="radio"
              name="flexRadioDefault3"
              id={allSubjects[semesterPass][0][branchPass][i]}
              onClick={subjectSelectHandler}
            />
            <label
              class="form-check-label pointer"
              for={allSubjects[semesterPass][0][branchPass][i]}
            >
              {allSubjects[semesterPass][0][branchPass][i]}
            </label>
          </li>
        );
      }
    console.log(subjectList);
    setAllSemesterSubjects(subjectList);
  };

  const subjectSelectHandler = (e) => {
    setSubject(e.target.id);
  };

  return (
    <nav
      id="sidebarMenu"
      class="collapse d-lg-block sidebar collapse bg-white mx-4"
    >
      <div class="position-sticky">
        <div class="list-group list-group-flush mt-4">
          {/* <!-- Collapse 1 --> */}
          <div
            class="list-group-item list-group-item-action py-2 ripple pointer"
            aria-current="true"
            data-mdb-toggle="collapse"
            href="#collapseExample1"
            aria-expanded="true"
            aria-controls="collapseExample1"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Semester</span>
          </div>
          {/* <!-- Collapsed content --> */}
          <ul
            id="collapseExample1"
            class="collapse show list-group list-group-flush"
          >
            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onClick={semesterHandler}
              />
              <label class="form-check-label pointer " for="flexRadioDefault1">
                Semester 1
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={semesterHandler}
              />
              <label class="form-check-label pointer" for="flexRadioDefault2">
                Semester 2
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
              />
              <label class="form-check-label pointer" for="flexRadioDefault3">
                Semester 3
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
              />
              <label class="form-check-label pointer" for="flexRadioDefault4">
                Semester 4
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault5"
              />
              <label class="form-check-label pointer" for="flexRadioDefault5">
                Semester 5
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault6"
              />
              <label class="form-check-label pointer" for="flexRadioDefault6">
                Semester 6
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault7"
              />
              <label class="form-check-label pointer" for="flexRadioDefault7">
                Semester 7
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault8"
              />
              <label class="form-check-label pointer" for="flexRadioDefault8">
                Semester 8
              </label>
            </li>
          </ul>
          {/* <!-- Collapse 1 --> */}

          {/* <-- Collapse 2 --> */}
          <div
            class="list-group-item list-group-item-action py-2 ripple pointer"
            aria-current="true"
            data-mdb-toggle="collapse"
            href="#collapseExample2"
            aria-expanded="true"
            aria-controls="collapseExample2"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Branch</span>
          </div>
          {/* <!-- Collapsed content --> */}
          <ul
            id="collapseExample1"
            class="collapse show list-group list-group-flush"
          >
            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault2"
                id="CSE"
                onClick={branchHandler}
              />
              <label class="form-check-label pointer " for="CSE">
                CSE
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault2"
                id="CCE"
                onClick={branchHandler}
              />
              <label class="form-check-label pointer" for="CCE">
                CCE
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault2"
                id="ECE"
                onClick={branchHandler}
              />
              <label class="form-check-label pointer" for="ECE">
                ECE
              </label>
            </li>

            <li className="list-group-item py-1 d-flex flex-col">
              <input
                class="form-check-input pointer"
                type="radio"
                name="flexRadioDefault2"
                id="ME"
                onClick={branchHandler}
              />
              <label class="form-check-label pointer" for="ME">
                ME
              </label>
            </li>
          </ul>
          {/* <!-- Collapse 2 --> */}

          {/* <-- Collapse 3 --> */}
          <div
            class="list-group-item list-group-item-action py-2 ripple pointer"
            aria-current="true"
            data-mdb-toggle="collapse"
            href="#collapseExample1"
            aria-expanded="true"
            aria-controls="collapseExample13"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Subjects</span>
          </div>
          {/* <!-- Collapsed content --> */}
          <ul
            id="collapseExample1"
            class="collapse show list-group list-group-flush"
          >
            {allSemesterSubjects}
          </ul>
          {/* <!-- Collapse 3 --> */}
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;

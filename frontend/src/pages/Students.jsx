import { useState, useEffect } from "react";
import axios from "axios";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async () => {
    if (!name || !email || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/students",
        {
          name,
          email,
          department,
        }
      );

      clearForm();
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to add student");
    }
  };

  const editStudent = (student) => {
    setEditingId(student.student_id);
    setName(student.name);
    setEmail(student.email);
    setDepartment(student.department);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateStudent = async () => {
    if (!name || !email || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/students/${editingId}`,
        {
          name,
          email,
          department,
        }
      );

      clearForm();
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert(
        "Unable to delete student. This student may be linked to other records."
      );
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setDepartment("");
  };

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-page">

      {/* ================= HEADER ================= */}

      <div className="students-header">

        <div>
          <span className="students-label">
            STUDENT MANAGEMENT
          </span>

          <h1>
            Students
          </h1>

          <p>
            Manage student profiles, departments and contact
            information from one place.
          </p>
        </div>

        <div className="students-header-icon">
          👨‍🎓
        </div>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="student-stats">

        <div className="student-stat-card">

          <div className="student-stat-icon blue">
            👥
          </div>

          <div>
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon green">
            🎓
          </div>

          <div>
            <span>Active Records</span>
            <strong>{students.length}</strong>
          </div>

        </div>


        <div className="student-stat-card">

          <div className="student-stat-icon purple">
            🏫
          </div>

          <div>
            <span>Departments</span>

            <strong>
              {
                new Set(
                  students.map(
                    (student) => student.department
                  )
                ).size
              }
            </strong>

          </div>

        </div>

      </div>


      {/* ================= ADD / EDIT FORM ================= */}

      <div className="student-form-card">

        <div className="form-title">

          <div>
            <h2>
              {editingId
                ? "Edit Student"
                : "Add New Student"}
            </h2>

            <p>
              {editingId
                ? "Update the student's information"
                : "Enter student details to create a new record"}
            </p>
          </div>

          <span>
            {editingId ? "✏️" : "➕"}
          </span>

        </div>


        <div className="student-form">

          <div className="form-group">

            <label>
              Student Name
            </label>

            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Department
            </label>

            <input
              type="text"
              placeholder="e.g. CSE"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            />

          </div>


          <div className="form-buttons">

            <button
              className="primary-button"
              onClick={
                editingId
                  ? updateStudent
                  : addStudent
              }
            >
              {editingId
                ? "✓ Update Student"
                : "+ Add Student"}
            </button>


            {editingId && (
              <button
                className="cancel-button"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}

          </div>

        </div>

      </div>


      {/* ================= STUDENT LIST ================= */}

      <div className="students-list-card">

        <div className="list-header">

          <div>
            <h2>
              Student Directory
            </h2>

            <p>
              {students.length} student record
              {students.length !== 1 ? "s" : ""} found
            </p>
          </div>


          <div className="search-box">

            <span>
              🔎
            </span>

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        {/* TABLE */}

        {filteredStudents.length > 0 ? (

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    Student
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Department
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredStudents.map(
                  (student) => (

                    <tr
                      key={
                        student.student_id
                      }
                    >

                      <td>
                        <span className="student-id">
                          #{student.student_id}
                        </span>
                      </td>


                      <td>

                        <div className="student-name">

                          <div className="avatar">
                            {student.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {student.name}
                          </strong>

                        </div>

                      </td>


                      <td>

                        <span className="student-email">
                          {student.email}
                        </span>

                      </td>


                      <td>

                        <span className="department-badge">
                          {student.department}
                        </span>

                      </td>


                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-button"
                            onClick={() =>
                              editStudent(student)
                            }
                          >
                            ✏️ Edit
                          </button>


                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteStudent(
                                student.student_id
                              )
                            }
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="empty-state">

            <div>
              👨‍🎓
            </div>

            <h3>
              No students found
            </h3>

            <p>
              Try a different search or add a new student.
            </p>

          </div>

        )}

      </div>


      {/* ================= FOOTER ================= */}

      <div className="students-footer">

        <span>
          💡
        </span>

        <div>
          <strong>
            Student Management
          </strong>

          <p>
            Keep your student records organized and
            up to date.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Students;
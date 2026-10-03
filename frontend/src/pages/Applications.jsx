import { useState, useEffect } from "react";
import axios from "axios";
import "./Applications.css";
function Applications() {
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [internships, setInternships] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [internshipId, setInternshipId] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchApplications();
    fetchStudents();
    fetchInternships();
  }, []);
  // ==========================================
  // GET APPLICATIONS
  // ==========================================
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications"
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  // ==========================================
  // GET STUDENTS
  // ==========================================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  // ==========================================
  // GET INTERNSHIPS
  // ==========================================
  const fetchInternships = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/internships"
      );
      setInternships(res.data);
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };
  // ==========================================
  // GET STUDENT NAME
  // ==========================================
  const getStudentName = (id) => {
    const student = students.find(
      (student) =>
        Number(student.student_id) === Number(id)
    );
    return student
      ? student.name
      : `Student #${id}`;
  };
  // ==========================================
  // GET INTERNSHIP DETAILS
  // ==========================================
  const getInternship = (id) => {
    return internships.find(
      (internship) =>
        Number(internship.internship_id) === Number(id)
    );
  };
  const getInternshipTitle = (id) => {
    const internship = getInternship(id);
    return internship
      ? internship.title
      : `Internship #${id}`;
  };
  // ==========================================
  // ADD APPLICATION
  // ==========================================
  const addApplication = async () => {
    if (!studentId || !internshipId) {
      alert("Please select a student and internship");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        {
          student_id: studentId,
          internship_id: internshipId,
        }
      );
      setStudentId("");
      setInternshipId("");
      fetchApplications();
    } catch (error) {
      console.error("Error adding application:", error);
      alert(
        error.response?.data?.message ||
        "Failed to add application"
      );
    }
  };
  // ==========================================
  // DELETE APPLICATION
  // ==========================================
  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${id}`
      );
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };
  // ==========================================
  // SEARCH
  // ==========================================
  const filteredApplications = applications.filter(
    (app) => {
      const studentName = getStudentName(
        app.student_id
      );
      const internshipTitle =
        getInternshipTitle(app.internship_id);

      const searchText = search.toLowerCase();
      return (
        studentName
          ?.toLowerCase()
          .includes(searchText) ||
        internshipTitle
          ?.toLowerCase()
          .includes(searchText) ||
        app.status
          ?.toLowerCase()
          .includes(searchText) ||
        String(app.application_id).includes(
          searchText
        )
      );
    }
  );
  // ==========================================
  // STATUS COUNTS
  // ==========================================
  const appliedCount = applications.filter(
    (app) =>
      app.status?.toLowerCase() === "applied"
  ).length;
  const selectedCount = applications.filter(
    (app) =>
      app.status?.toLowerCase() === "selected"
  ).length;
  return (
    <div className="applications-page">
      {/* ========================================
          HEADER
      ======================================== */}
      <div className="applications-header">
        <div>
          <p className="applications-label">
            APPLICATION MANAGEMENT
          </p>
          <h1>Applications</h1>
          <p>
            Track student applications and internship
            opportunities in one place.
          </p>
        </div>
        <div className="applications-header-icon">
          📋
        </div>
      </div>
      {/* ========================================
          STATS
      ======================================== */}
      <div className="application-stats">
        <div className="application-stat-card">
          <div className="application-stat-icon">
            📋
          </div>
          <div>
            <span>Total Applications</span>
            <strong>
              {applications.length}
            </strong>
          </div>
        </div>
        <div className="application-stat-card">
          <div className="application-stat-icon">
            ⏳
          </div>
          <div>
            <span>Applied</span>
            <strong>
              {appliedCount}
            </strong>
          </div>
        </div>
        <div className="application-stat-card">
          <div className="application-stat-icon">
            🎉
          </div>
          <div>
            <span>Selected</span>
            <strong>
              {selectedCount}
            </strong>
          </div>
        </div>
        <div className="application-stat-card">
          <div className="application-stat-icon">
            👥
          </div>
          <div>
            <span>Students</span>
            <strong>
              {students.length}
            </strong>
          </div>
        </div>
      </div>
      {/* ========================================
          ADD APPLICATION
      ======================================== */}
      <div className="application-form-card">
        <div className="application-section-heading">
          <div>
            <h2>New Application</h2>
            <p>
              Submit a student application for an
              internship.
            </p>
          </div>
          <span>➕</span>
        </div>
        <div className="application-form">
          <div className="application-form-group">
            <label>Student</label>
            <select
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            >
              <option value="">
                Select Student
              </option>
              {students.map((student) => (
                <option
                  key={student.student_id}
                  value={student.student_id}
                >
                  {student.name} —{" "}
                  {student.department}
                </option>
              ))}
            </select>
          </div>
          <div className="application-form-group">
            <label>Internship</label>
            <select
              value={internshipId}
              onChange={(e) =>
                setInternshipId(e.target.value)
              }
            >
              <option value="">
                Select Internship
              </option>
              {internships.map((internship) => (
                <option
                  key={internship.internship_id}
                  value={internship.internship_id}
                >
                  {internship.title}
                </option>
              ))}
            </select>
          </div>
          <button
            className="apply-button"
            onClick={addApplication}
          >
            🚀 Apply Now
          </button>
        </div>
      </div>
      {/* ========================================
          APPLICATION DIRECTORY
      ======================================== */}
      <div className="application-directory">
        <div className="application-directory-header">
          <div>
            <h2>Application Directory</h2>

            <p>
              {filteredApplications.length} application
              {filteredApplications.length !== 1
                ? "s"
                : ""}{" "}
              displayed
            </p>
          </div>
          <input
            className="application-search"
            type="text"
            placeholder="🔍 Search applications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
        {filteredApplications.length === 0 ? (
          <div className="applications-empty">
            <div>📭</div>
            <h3>No applications found</h3>
            <p>
              Submit an application or try a different
              search.
            </p>
          </div>
        ) : (
          <div className="application-table-wrapper">
            <table className="application-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Internship</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(
                  (app) => (
                    <tr
                      key={app.application_id}
                    >
                      <td>
                        <span className="application-id">
                          #{app.application_id}
                        </span>
                      </td>
                      <td>
                        <div className="student-info">
                          <div className="student-avatar">
                            {getStudentName(
                              app.student_id
                            )
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                          <div>
                            <strong>
                              {getStudentName(
                                app.student_id
                              )}
                            </strong>
                            <small>
                              Student ID:{" "}
                              {app.student_id}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="internship-info">
                          <div className="application-job-icon">
                            💼
                          </div>
                          <div>
                            <strong>
                              {getInternshipTitle(
                                app.internship_id
                              )}
                            </strong>
                            <small>
                              Internship ID:{" "}
                              {app.internship_id}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`application-status ${
                            app.status
                              ?.toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )
                          }`}
                        >
                          ● {app.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="delete-application-button"
                          onClick={() =>
                            deleteApplication(
                              app.application_id
                            )
                          }
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* ========================================
          FOOTER
      ======================================== */}
      <div className="applications-footer">
        <span>🎓 StudentPortal</span>
        <span>
          Internship & Skill Tracking System
        </span>
      </div>
    </div>
  );
}
export default Applications;
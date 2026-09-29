import { useState, useEffect } from "react";
import axios from "axios";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [internshipId, setInternshipId] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications"
      );
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addApplication = async () => {
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
      console.error(error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${id}`
      );

      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Applications</h2>

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Internship ID"
        value={internshipId}
        onChange={(e) => setInternshipId(e.target.value)}
      />

      <br /><br />

      <button onClick={addApplication}>
        Apply
      </button>

      <hr />

      {applications.map((app) => (
        <div key={app.application_id}>
          <h3>Application #{app.application_id}</h3>

          <p>Student ID: {app.student_id}</p>

          <p>Internship ID: {app.internship_id}</p>

          <p>Status: {app.status}</p>

          <button
            onClick={() =>
              deleteApplication(app.application_id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Applications;
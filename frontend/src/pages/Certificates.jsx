import { useState, useEffect } from "react";
import axios from "axios";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [issueDate, setIssueDate] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/certificates"
    );
    setCertificates(res.data);
  };

  const addCertificate = async () => {
    await axios.post(
      "http://localhost:5000/api/certificates",
      {
        student_id: studentId,
        certificate_name: certificateName,
        issue_date: issueDate,
      }
    );

    setStudentId("");
    setCertificateName("");
    setIssueDate("");

    fetchCertificates();
  };
const deleteCertificate = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/certificates/${id}`
    );

    fetchCertificates();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>
      <h2>Certificates</h2>

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Certificate Name"
        value={certificateName}
        onChange={(e) => setCertificateName(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
      />

      <br /><br />

      <button onClick={addCertificate}>
        Add Certificate
      </button>

      <hr />

     {certificates.map((cert) => (
  <div key={cert.certificate_id}>
    <h3>{cert.certificate_name}</h3>

    <p>Student ID: {cert.student_id}</p>

    <p>Issue Date: {cert.issue_date}</p>

    <button
      onClick={() =>
        deleteCertificate(cert.certificate_id)
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

export default Certificates;
import { useState, useEffect } from "react";
import axios from "axios";
import "./Certificates.css";

function Certificates() {
  const [certificates, setCertificates] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Fetch certificates
  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/certificates"
      );

      setCertificates(res.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  // Add certificate
  const addCertificate = async () => {
    if (!studentId || !certificateName || !issueDate) {
      alert("Please fill all certificate details.");
      return;
    }

    if (!certificateFile) {
      alert("Please upload a certificate.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("student_id", studentId);
      formData.append("certificate_name", certificateName);
      formData.append("issue_date", issueDate);
      formData.append("certificate_file", certificateFile);

      await axios.post(
        "http://localhost:5000/api/certificates",
        formData
      );

      alert("Certificate added successfully!");

      setStudentId("");
      setCertificateName("");
      setIssueDate("");
      setCertificateFile(null);

      const fileInput = document.getElementById(
        "certificate-upload"
      );

      if (fileInput) {
        fileInput.value = "";
      }

      fetchCertificates();

    } catch (error) {
      console.error("Error adding certificate:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add certificate."
      );
    }
  };

  // Delete certificate
  const deleteCertificate = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/certificates/${id}`
      );

      alert("Certificate deleted successfully.");

      fetchCertificates();

    } catch (error) {
      console.error("Error deleting certificate:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete certificate."
      );
    }
  };

  // Search
  const filteredCertificates = certificates.filter((cert) =>
    `${cert.certificate_name} ${cert.student_id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Number of unique students
  const studentCount = new Set(
    certificates.map((cert) => cert.student_id)
  ).size;

  return (
    <div className="certificates-page">

      {/* ================= HEADER ================= */}

      <div className="certificates-header">

        <div>
          <p className="certificates-label">
            CERTIFICATE MANAGEMENT
          </p>

          <h1>Certificates</h1>

          <p className="certificates-subtitle">
            Manage, upload and track student certificates.
          </p>
        </div>

        <div className="certificate-header-icon">
          🏆
        </div>

      </div>


      {/* ================= STATISTICS ================= */}

      <div className="certificate-stats">

        <div className="certificate-stat-card">

          <div className="certificate-stat-icon">
            🏆
          </div>

          <div>
            <span>Total Certificates</span>
            <strong>{certificates.length}</strong>
          </div>

        </div>


        <div className="certificate-stat-card">

          <div className="certificate-stat-icon">
            🎓
          </div>

          <div>
            <span>Students</span>
            <strong>{studentCount}</strong>
          </div>

        </div>


        <div className="certificate-stat-card">

          <div className="certificate-stat-icon">
            📁
          </div>

          <div>
            <span>Uploaded Files</span>
            <strong>
              {certificates.length}
            </strong>
          </div>

        </div>

      </div>


      {/* ================= ADD CERTIFICATE ================= */}

      <div className="certificate-form-card">

        <div className="certificate-section-heading">

          <div>
            <h2>Add New Certificate</h2>

            <p>
              Enter the certificate details and upload the file.
            </p>
          </div>

          <span>＋</span>

        </div>


        <div className="certificate-form">

          {/* Student ID */}

          <div className="certificate-form-group">

            <label>Student ID</label>

            <input
              type="number"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            />

          </div>


          {/* Certificate Name */}

          <div className="certificate-form-group">

            <label>Certificate Name</label>

            <input
              type="text"
              placeholder="e.g. React Certification"
              value={certificateName}
              onChange={(e) =>
                setCertificateName(e.target.value)
              }
            />

          </div>


          {/* Issue Date */}

          <div className="certificate-form-group">

            <label>Issue Date</label>

            <input
              type="date"
              value={issueDate}
              onChange={(e) =>
                setIssueDate(e.target.value)
              }
            />

          </div>


          {/* Upload Certificate */}

          <div className="certificate-upload-group">

            <label>Upload Certificate</label>

            <label
              htmlFor="certificate-upload"
              className="certificate-upload-box"
            >

              <span className="upload-icon">
                📁
              </span>

              <span className="upload-text">

                {certificateFile
                  ? certificateFile.name
                  : "Choose certificate"}

              </span>

              <small>
                PDF / JPG / PNG
              </small>

            </label>


            <input
              id="certificate-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {

                const file = e.target.files[0];

                if (file) {

                  // Maximum 10 MB
                  if (file.size > 10 * 1024 * 1024) {

                    alert(
                      "File size must be less than 10 MB."
                    );

                    e.target.value = "";
                    setCertificateFile(null);

                    return;
                  }

                  setCertificateFile(file);
                }

              }}
            />

          </div>

        </div>


        {/* Add Button */}

        <button
          className="add-certificate-btn"
          onClick={addCertificate}
        >
          + Add Certificate
        </button>

      </div>


      {/* ================= CERTIFICATE DIRECTORY ================= */}

      <div className="certificate-list-card">

        <div className="certificate-list-header">

          <div>

            <h2>Certificate Directory</h2>

            <p>
              {filteredCertificates.length} certificate
              {filteredCertificates.length !== 1
                ? "s"
                : ""}{" "}
              displayed
            </p>

          </div>


          {/* Search */}

          <input
            className="certificate-search"
            type="text"
            placeholder="🔍 Search certificates..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* ================= EMPTY ================= */}

        {filteredCertificates.length === 0 ? (

          <div className="empty-certificates">

            <div className="empty-icon">
              🏆
            </div>

            <h3>
              No certificates found
            </h3>

            <p>
              Add a certificate to see it here.
            </p>

          </div>

        ) : (

          /* ================= TABLE ================= */

          <div className="certificate-table-wrapper">

            <table className="certificate-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Certificate</th>

                  <th>Student</th>

                  <th>Issue Date</th>

                  <th>File</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {filteredCertificates.map((cert) => (

                  <tr key={cert.certificate_id}>

                    {/* ID */}

                    <td>

                      <span className="certificate-id">
                        #{cert.certificate_id}
                      </span>

                    </td>


                    {/* Certificate */}

                    <td>

                      <div className="certificate-name-cell">

                        <div className="certificate-avatar">
                          🏆
                        </div>

                        <strong>
                          {cert.certificate_name}
                        </strong>

                      </div>

                    </td>


                    {/* Student */}

                    <td>

                     <span className="student-badge">
  🎓 {cert.student_name || `Student #${cert.student_id}`}
</span>

                    </td>


                    {/* Date */}

                    <td>

                      {cert.issue_date
                        ? new Date(
                            cert.issue_date
                          ).toLocaleDateString()
                        : "-"}

                    </td>


                    {/* File */}

                    <td>

                      <a
                        className="view-certificate-btn"
                        href={`http://localhost:5000/api/certificates/${cert.certificate_id}/file`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        📄 View
                      </a>

                    </td>


                    {/* Delete */}

                    <td>

                      <button
                        className="delete-certificate-btn"
                        onClick={() =>
                          deleteCertificate(
                            cert.certificate_id
                          )
                        }
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ================= FOOTER ================= */}

      <div className="certificates-footer">
        StudentPortal • Certificate Management
      </div>

    </div>
  );
}

export default Certificates;
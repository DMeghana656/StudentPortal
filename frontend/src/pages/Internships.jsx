import { useState, useEffect } from "react";
import axios from "axios";
import "./Internships.css";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [companyId, setCompanyId] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInternships();
    fetchCompanies();
  }, []);

  // ================================
  // GET INTERNSHIPS
  // ================================

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

  // ================================
  // GET COMPANIES
  // ================================

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/companies"
      );

      setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // ================================
  // ADD INTERNSHIP
  // ================================

  const addInternship = async () => {
    if (!companyId || !title || !duration) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/internships",
        {
          company_id: companyId,
          title: title,
          duration: duration,
        }
      );

      setCompanyId("");
      setTitle("");
      setDuration("");

      fetchInternships();
    } catch (error) {
      console.error("Error adding internship:", error);
      alert("Failed to add internship");
    }
  };

  // ================================
  // DELETE INTERNSHIP
  // ================================

  const deleteInternship = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/internships/${id}`
      );

      fetchInternships();
    } catch (error) {
      console.error("Error deleting internship:", error);

      if (error.response?.status === 500) {
        alert(
          "This internship cannot be deleted because it is linked to an application."
        );
      } else {
        alert("Failed to delete internship");
      }
    }
  };

  // ================================
  // GET COMPANY NAME
  // ================================

  const getCompanyName = (companyId) => {
    const company = companies.find(
      (company) => company.company_id === companyId
    );

    return company
      ? company.company_name
      : `Company #${companyId}`;
  };

  // ================================
  // SEARCH
  // ================================

  const filteredInternships = internships.filter((internship) => {
    const companyName = getCompanyName(internship.company_id);

    return (
      internship.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      companyName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      internship.duration
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div className="internships-page">

      {/* ================= HEADER ================= */}

      <div className="internships-header">
        <div>
          <p className="page-label">CAREER OPPORTUNITIES</p>

          <h1>Internships</h1>

          <p>
            Discover and manage internship opportunities
            available for students.
          </p>
        </div>

        <div className="header-icon">
          💼
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="internship-stats">

        <div className="internship-stat-card">
          <div className="stat-icon">💼</div>

          <div>
            <span>Total Internships</span>
            <strong>{internships.length}</strong>
          </div>
        </div>

        <div className="internship-stat-card">
          <div className="stat-icon">🏢</div>

          <div>
            <span>Companies</span>
            <strong>{companies.length}</strong>
          </div>
        </div>

        <div className="internship-stat-card">
          <div className="stat-icon">📊</div>

          <div>
            <span>Displayed</span>
            <strong>{filteredInternships.length}</strong>
          </div>
        </div>

      </div>

      {/* ================= ADD INTERNSHIP ================= */}

      <div className="internship-form-card">

        <div className="section-heading">
          <div>
            <h2>Add Internship</h2>
            <p>Create a new internship opportunity.</p>
          </div>

          <span>➕</span>
        </div>

        <div className="internship-form">

          <div className="form-group">
            <label>Company</label>

            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <option value="">
                Select Company
              </option>

              {companies.map((company) => (
                <option
                  key={company.company_id}
                  value={company.company_id}
                >
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Internship Title</label>

            <input
              type="text"
              placeholder="Example: React Developer Intern"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>

            <input
              type="text"
              placeholder="Example: 3 Months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <button
            className="add-internship-btn"
            onClick={addInternship}
          >
            + Add Internship
          </button>

        </div>
      </div>

      {/* ================= DIRECTORY ================= */}

      <div className="internship-directory">

        <div className="directory-header">

          <div>
            <h2>Internship Directory</h2>

            <p>
              {filteredInternships.length} internship
              {filteredInternships.length !== 1 ? "s" : ""}
              {" "}displayed
            </p>
          </div>

          <input
            className="internship-search"
            type="text"
            placeholder="🔍 Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {filteredInternships.length === 0 ? (

          <div className="empty-internships">
            <div>📭</div>

            <h3>No internships found</h3>

            <p>
              Add an internship or try a different search.
            </p>
          </div>

        ) : (

          <div className="internship-table-wrapper">

            <table className="internship-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Internship</th>
                  <th>Company</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredInternships.map((internship) => (

                  <tr key={internship.internship_id}>

                    <td>
                      <span className="id-badge">
                        #{internship.internship_id}
                      </span>
                    </td>

                    <td>
                      <div className="internship-title">

                        <div className="internship-icon">
                          💼
                        </div>

                        <div>
                          <strong>
                            {internship.title}
                          </strong>

                          <small>
                            Internship Opportunity
                          </small>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="company-badge">
                        🏢{" "}
                        {getCompanyName(
                          internship.company_id
                        )}
                      </span>
                    </td>

                    <td>
                      <span className="duration-badge">
                        ⏱ {internship.duration}
                      </span>
                    </td>

                    <td>
                      <span className="active-badge">
                        ● Active
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-internship-btn"
                        onClick={() =>
                          deleteInternship(
                            internship.internship_id
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

      <div className="internship-footer">
        <span>🎓 StudentPortal</span>

        <span>
          Internship & Skill Tracking System
        </span>
      </div>

    </div>
  );
}

export default Internships;
import { useState, useEffect } from "react";
import axios from "axios";
import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const addCompany = async () => {
    if (!companyName.trim() || !domain.trim()) {
      alert("Please enter company name and domain.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/companies",
        {
          company_name: companyName,
          domain: domain,
        }
      );

      setCompanyName("");
      setDomain("");

      fetchCompanies();
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Failed to add company.");
    }
  };

  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/companies/${id}`
      );

      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("This company may be linked to internships and cannot be deleted.");
    }
  };

  const filteredCompanies = companies.filter((company) =>
    `${company.company_name} ${company.domain}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const uniqueDomains = new Set(
    companies.map((company) => company.domain)
  ).size;

  return (
    <div className="companies-page">

      {/* Header */}
      <div className="companies-header">
        <div>
          <p className="companies-label">COMPANY MANAGEMENT</p>
          <h1>Companies</h1>
          <p>
            Manage companies and their domains in your internship portal.
          </p>
        </div>

        <div className="companies-header-icon">
          🏢
        </div>
      </div>

      {/* Statistics */}
      <div className="company-stats">

        <div className="company-stat-card">
          <div className="stat-icon">🏢</div>
          <div>
            <span>Total Companies</span>
            <strong>{companies.length}</strong>
          </div>
        </div>

        <div className="company-stat-card">
          <div className="stat-icon">🌐</div>
          <div>
            <span>Domains</span>
            <strong>{uniqueDomains}</strong>
          </div>
        </div>

        <div className="company-stat-card">
          <div className="stat-icon">📊</div>
          <div>
            <span>Active Records</span>
            <strong>{companies.length}</strong>
          </div>
        </div>

      </div>

      {/* Add Company */}
      <div className="company-form-card">

        <div className="section-heading">
          <div>
            <h2>Add New Company</h2>
            <p>Enter the company details below.</p>
          </div>
          <span>＋</span>
        </div>

        <div className="company-form">

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="e.g. Infosys"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Domain / Industry</label>
            <input
              type="text"
              placeholder="e.g. Software"
              value={domain}
              onChange={(e) =>
                setDomain(e.target.value)
              }
            />
          </div>

          <button
            className="add-company-btn"
            onClick={addCompany}
          >
            + Add Company
          </button>

        </div>
      </div>

      {/* Company Directory */}
      <div className="company-list-card">

        <div className="company-list-header">
          <div>
            <h2>Company Directory</h2>
            <p>
              {filteredCompanies.length} companies displayed
            </p>
          </div>

          <input
            className="company-search"
            type="text"
            placeholder="🔍 Search companies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="empty-companies">
            <div>🏢</div>
            <h3>No companies found</h3>
            <p>
              Add a company or change your search.
            </p>
          </div>
        ) : (
          <div className="company-table-wrapper">

            <table className="company-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company</th>
                  <th>Domain</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredCompanies.map((company) => (

                  <tr key={company.company_id}>

                    <td>
                      <span className="company-id">
                        #{company.company_id}
                      </span>
                    </td>

                    <td>
                      <div className="company-name-cell">

                        <div className="company-avatar">
                          {company.company_name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {company.company_name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      <span className="domain-badge">
                        {company.domain}
                      </span>
                    </td>

                    <td>
                      <span className="status-badge">
                        Active
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-company-btn"
                        onClick={() =>
                          deleteCompany(company.company_id)
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

      <div className="companies-footer">
        StudentPortal • Company Management
      </div>

    </div>
  );
}

export default Companies;
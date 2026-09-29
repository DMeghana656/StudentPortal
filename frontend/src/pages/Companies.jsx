import { useState, useEffect } from "react";
import axios from "axios";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/companies"
    );
    setCompanies(res.data);
  };

  const addCompany = async () => {
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
  };
const deleteCompany = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/companies/${id}`
    );

    fetchCompanies();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>
      <h2>Companies</h2>

      <input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) =>
          setCompanyName(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Domain"
        value={domain}
        onChange={(e) =>
          setDomain(e.target.value)
        }
      />

      <br /><br />

      <button onClick={addCompany}>
        Add Company
      </button>

      <hr />

     {companies.map((company) => (
  <div key={company.company_id}>
    <h3>{company.company_name}</h3>
    <p>{company.domain}</p>

    <button
      onClick={() =>
        deleteCompany(company.company_id)
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

export default Companies;
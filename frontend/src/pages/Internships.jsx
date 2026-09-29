import { useState, useEffect } from "react";
import axios from "axios";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/internships"
    );
    setInternships(res.data);
  };

  const addInternship = async () => {
    await axios.post(
      "http://localhost:5000/api/internships",
      {
        company_id: companyId,
        title,
        duration
      }
    );

    setCompanyId("");
    setTitle("");
    setDuration("");

    fetchInternships();
  };
const deleteInternship = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/internships/${id}`
    );

    fetchInternships();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>
      <h2>Internships</h2>

      <input
        placeholder="Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <br /><br />

      <button onClick={addInternship}>
        Add Internship
      </button>

      <hr />

      {internships.map((internship) => (
  <div key={internship.internship_id}>
    <h3>{internship.title}</h3>
    <p>Company ID: {internship.company_id}</p>
    <p>Duration: {internship.duration}</p>

    <button
      onClick={() =>
        deleteInternship(internship.internship_id)
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

export default Internships;
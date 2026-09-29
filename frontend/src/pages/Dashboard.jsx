import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [students, setStudents] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [internships, setInternships] = useState(0);
  const [applications, setApplications] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [skills, setSkills] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const studentsRes = await axios.get("http://localhost:5000/api/students");
    const companiesRes = await axios.get("http://localhost:5000/api/companies");
    const internshipsRes = await axios.get("http://localhost:5000/api/internships");
    const applicationsRes = await axios.get("http://localhost:5000/api/applications");
    const certificatesRes = await axios.get("http://localhost:5000/api/certificates");
    const skillsRes = await axios.get("http://localhost:5000/api/skills");

    setStudents(studentsRes.data.length);
    setCompanies(companiesRes.data.length);
    setInternships(internshipsRes.data.length);
    setApplications(applicationsRes.data.length);
    setCertificates(certificatesRes.data.length);
    setSkills(skillsRes.data.length);
  };

  return (
    <div>
      <h1>Internship & Skill Tracking Portal</h1>

      <h3>Total Students: {students}</h3>
      <h3>Total Companies: {companies}</h3>
      <h3>Total Internships: {internships}</h3>
      <h3>Total Applications: {applications}</h3>
      <h3>Total Certificates: {certificates}</h3>
      <h3>Total Skills: {skills}</h3>
    </div>
  );
}

export default Dashboard;
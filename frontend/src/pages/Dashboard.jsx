import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [internships, setInternships] = useState(0);
  const [applications, setApplications] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [skills, setSkills] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        studentsRes,
        companiesRes,
        internshipsRes,
        applicationsRes,
        certificatesRes,
        skillsRes,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/students"),
        axios.get("http://localhost:5000/api/companies"),
        axios.get("http://localhost:5000/api/internships"),
        axios.get("http://localhost:5000/api/applications"),
        axios.get("http://localhost:5000/api/certificates"),
        axios.get("http://localhost:5000/api/skills"),
      ]);

      setStudents(studentsRes.data.length);
      setCompanies(companiesRes.data.length);
      setInternships(internshipsRes.data.length);
      setApplications(applicationsRes.data.length);
      setCertificates(certificatesRes.data.length);
      setSkills(skillsRes.data.length);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Students",
      value: students,
      icon: "👨‍🎓",
      description: "Registered students",
      className: "blue",
    },
    {
      title: "Companies",
      value: companies,
      icon: "🏢",
      description: "Partner companies",
      className: "purple",
    },
    {
      title: "Internships",
      value: internships,
      icon: "💼",
      description: "Available opportunities",
      className: "green",
    },
    {
      title: "Applications",
      value: applications,
      icon: "📝",
      description: "Submitted applications",
      className: "orange",
    },
    {
      title: "Certificates",
      value: certificates,
      icon: "🎓",
      description: "Student certificates",
      className: "pink",
    },
    {
      title: "Skills",
      value: skills,
      icon: "🧠",
      description: "Tracked technical skills",
      className: "cyan",
    },
  ];

  return (
    <main className="dashboard-page">

      {/* ================= HERO ================= */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <div className="dashboard-label">
            STUDENT INTERNSHIP PORTAL
          </div>

          <h1>
            Welcome to your
            <span> Internship Hub</span>
          </h1>

          <p>
            Manage students, companies, internships, applications,
            certificates and skills from one centralized platform.
          </p>

        </div>

        <div className="hero-icon">
          🎓
        </div>

      </section>


      {/* ================= STATISTICS ================= */}

      <section className="stats-section">

        <div className="section-heading">

          <div>
            <h2>Portal Overview</h2>
            <p>
              Real-time information from your database
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={loadData}
          >
            ↻ Refresh
          </button>

        </div>


        <div className="stats-grid">

          {stats.map((stat) => (

            <div
              className={`stat-card ${stat.className}`}
              key={stat.title}
            >

              <div className="stat-top">

                <div className="stat-icon">
                  {stat.icon}
                </div>

                <span className="stat-arrow">
                  ↗
                </span>

              </div>


              <div className="stat-value">

                {loading ? "..." : stat.value}

              </div>


              <h3>
                {stat.title}
              </h3>


              <p>
                {stat.description}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= LOWER CONTENT ================= */}

      <section className="dashboard-content">


        {/* QUICK ACCESS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Quick Access</h2>

              <p>
                Manage your portal easily
              </p>
            </div>

            <span className="panel-symbol">
              ⚡
            </span>

          </div>


          <div className="quick-actions">


            <a
              href="/students"
              className="quick-action"
            >

              <span>
                👨‍🎓
              </span>

              <div>
                <strong>
                  Students
                </strong>

                <small>
                  Manage student records
                </small>
              </div>

              <b>
                →
              </b>

            </a>


            <a
              href="/companies"
              className="quick-action"
            >

              <span>
                🏢
              </span>

              <div>
                <strong>
                  Companies
                </strong>

                <small>
                  View partner companies
                </small>
              </div>

              <b>
                →
              </b>

            </a>


            <a
              href="/internships"
              className="quick-action"
            >

              <span>
                💼
              </span>

              <div>
                <strong>
                  Internships
                </strong>

                <small>
                  Manage opportunities
                </small>
              </div>

              <b>
                →
              </b>

            </a>


            <a
              href="/applications"
              className="quick-action"
            >

              <span>
                📝
              </span>

              <div>
                <strong>
                  Applications
                </strong>

                <small>
                  Track applications
                </small>
              </div>

              <b>
                →
              </b>

            </a>

          </div>

        </div>


        {/* PORTAL SUMMARY */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h2>
                Portal Summary
              </h2>

              <p>
                Current system statistics
              </p>

            </div>

            <span className="panel-symbol">
              📊
            </span>

          </div>


          <div className="summary-list">


            <div className="summary-item">

              <span>
                Student records
              </span>

              <strong>
                {students}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Partner companies
              </span>

              <strong>
                {companies}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Internship opportunities
              </span>

              <strong>
                {internships}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Applications submitted
              </span>

              <strong>
                {applications}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Certificates earned
              </span>

              <strong>
                {certificates}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Skills tracked
              </span>

              <strong>
                {skills}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <section className="dashboard-footer">

        <div className="footer-icon">
          🚀
        </div>

        <div>

          <strong>
            Build your career with StudentPortal
          </strong>

          <p>
            Track internships, applications, skills and
            achievements in one place.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;
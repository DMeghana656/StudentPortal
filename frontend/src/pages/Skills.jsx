import { useState, useEffect } from "react";
import axios from "axios";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  // ==========================================
  // GET SKILLS
  // ==========================================

  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/skills"
      );

      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // ==========================================
  // ADD SKILL
  // ==========================================

  const addSkill = async () => {
    if (!skillName.trim()) {
      alert("Please enter a skill name");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/skills",
        {
          skill_name: skillName.trim(),
        }
      );

      setSkillName("");

      fetchSkills();
    } catch (error) {
      console.error("Error adding skill:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add skill"
      );
    }
  };

  // ==========================================
  // DELETE SKILL
  // ==========================================

  const deleteSkill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/skills/${id}`
      );

      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);

      alert(
        "This skill may be linked to a student and cannot be deleted."
      );
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredSkills = skills.filter((skill) =>
    skill.skill_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="skills-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="skills-header">

        <div>
          <p className="skills-label">
            SKILL MANAGEMENT
          </p>

          <h1>Skills</h1>

          <p>
            Manage technical and professional skills
            available in the student portal.
          </p>
        </div>

        <div className="skills-header-icon">
          🧠
        </div>

      </div>

      {/* ========================================
          STATS
      ======================================== */}

      <div className="skills-stats">

        <div className="skill-stat-card">

          <div className="skill-stat-icon">
            🧠
          </div>

          <div>
            <span>Total Skills</span>

            <strong>
              {skills.length}
            </strong>
          </div>

        </div>

        <div className="skill-stat-card">

          <div className="skill-stat-icon">
            🔎
          </div>

          <div>
            <span>Displayed</span>

            <strong>
              {filteredSkills.length}
            </strong>
          </div>

        </div>

        <div className="skill-stat-card">

          <div className="skill-stat-icon">
            🚀
          </div>

          <div>
            <span>Skill Library</span>

            <strong>
              Active
            </strong>
          </div>

        </div>

      </div>

      {/* ========================================
          ADD SKILL
      ======================================== */}

      <div className="skill-form-card">

        <div className="skill-section-heading">

          <div>
            <h2>Add New Skill</h2>

            <p>
              Add a skill to the portal's skill library.
            </p>
          </div>

          <span>➕</span>

        </div>

        <div className="skill-form">

          <div className="skill-input-group">

            <label>
              Skill Name
            </label>

            <input
              type="text"
              placeholder="Example: Python"
              value={skillName}
              onChange={(e) =>
                setSkillName(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSkill();
                }
              }}
            />

          </div>

          <button
            className="add-skill-button"
            onClick={addSkill}
          >
            + Add Skill
          </button>

        </div>

      </div>

      {/* ========================================
          SKILL DIRECTORY
      ======================================== */}

      <div className="skills-directory">

        <div className="skills-directory-header">

          <div>
            <h2>Skill Directory</h2>

            <p>
              {filteredSkills.length} skill
              {filteredSkills.length !== 1
                ? "s"
                : ""}{" "}
              displayed
            </p>
          </div>

          <input
            className="skills-search"
            type="text"
            placeholder="🔍 Search skills..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {filteredSkills.length === 0 ? (

          <div className="skills-empty">

            <div>🧠</div>

            <h3>
              No skills found
            </h3>

            <p>
              Add a skill or try a different search.
            </p>

          </div>

        ) : (

          <div className="skills-grid">

            {filteredSkills.map(
              (skill, index) => (

                <div
                  className="skill-card"
                  key={skill.skill_id}
                >

                  <div className="skill-card-top">

                    <div className="skill-number">
                      #{skill.skill_id}
                    </div>

                    <div className="skill-symbol">
                      {index % 5 === 0
                        ? "💻"
                        : index % 5 === 1
                        ? "⚙️"
                        : index % 5 === 2
                        ? "🚀"
                        : index % 5 === 3
                        ? "🔧"
                        : "🧩"}
                    </div>

                  </div>

                  <h3>
                    {skill.skill_name}
                  </h3>

                  <p>
                    Technical skill
                  </p>

                  <div className="skill-card-bottom">

                    <span className="skill-status">
                      ● Active
                    </span>

                    <button
                      className="delete-skill-button"
                      onClick={() =>
                        deleteSkill(
                          skill.skill_id
                        )
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* ========================================
          FOOTER
      ======================================== */}

      <div className="skills-footer">

        <span>
          🎓 StudentPortal
        </span>

        <span>
          Internship & Skill Tracking System
        </span>

      </div>

    </div>
  );
}

export default Skills;
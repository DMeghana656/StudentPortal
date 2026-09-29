import { useState, useEffect } from "react";
import axios from "axios";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/skills"
    );
    setSkills(res.data);
  };

  const addSkill = async () => {
    await axios.post(
      "http://localhost:5000/api/skills",
      {
        skill_name: skillName,
      }
    );

    setSkillName("");
    fetchSkills();
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/skills/${id}`
      );

      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Skills</h2>

      <input
        placeholder="Skill Name"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      />

      <br /><br />

      <button onClick={addSkill}>
        Add Skill
      </button>

      <hr />

      {skills.map((skill) => (
        <div key={skill.skill_id}>
          <h3>{skill.skill_name}</h3>

          <button
            onClick={() => deleteSkill(skill.skill_id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Skills;
import { useState, useEffect } from "react";
import axios from "axios";

function StudentSkills() {
  const [studentSkills, setStudentSkills] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [skillId, setSkillId] = useState("");

  useEffect(() => {
    fetchStudentSkills();
  }, []);

  const fetchStudentSkills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/student-skills"
      );
      setStudentSkills(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const assignSkill = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/student-skills",
        {
          student_id: studentId,
          skill_id: skillId,
        }
      );

      setStudentId("");
      setSkillId("");

      fetchStudentSkills();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudentSkill = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/student-skills/${id}`
      );

      fetchStudentSkills();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Student Skills</h2>

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Skill ID"
        value={skillId}
        onChange={(e) => setSkillId(e.target.value)}
      />

      <br /><br />

      <button onClick={assignSkill}>
        Assign Skill
      </button>

      <hr />

      {studentSkills.map((item) => (
        <div key={item.id}>
          <p>Student ID: {item.student_id}</p>
          <p>Skill ID: {item.skill_id}</p>

          <button
            onClick={() => deleteStudentSkill(item.id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default StudentSkills;
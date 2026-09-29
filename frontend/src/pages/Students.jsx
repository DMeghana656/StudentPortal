import { useState, useEffect } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/students",
        {
          name,
          email,
          department,
        }
      );

      setName("");
      setEmail("");
      setDepartment("");

      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student.student_id);
    setName(student.name);
    setEmail(student.email);
    setDepartment(student.department);
  };

  const updateStudent = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/students/${editingId}`,
        {
          name,
          email,
          department,
        }
      );

      setEditingId(null);
      setName("");
      setEmail("");
      setDepartment("");

      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Students</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br /><br />

      <button
        onClick={
          editingId
            ? updateStudent
            : addStudent
        }
      >
        {editingId
          ? "Update Student"
          : "Add Student"}
      </button>

      <hr />

      {students.map((student) => (
        <div key={student.student_id}>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
          <p>{student.department}</p>

          <button
            onClick={() => editStudent(student)}
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteStudent(student.student_id)
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

export default Students;
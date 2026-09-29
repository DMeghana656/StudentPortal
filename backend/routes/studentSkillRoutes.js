const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET Student Skills
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM student_skills",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// POST Student Skill
router.post("/", (req, res) => {

  const { student_id, skill_id } = req.body;

  db.query(
    "INSERT INTO student_skills(student_id, skill_id) VALUES(?, ?)",
    [student_id, skill_id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Skill Assigned Successfully"
      });

    }
  );

});

// DELETE Student Skill
router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM student_skills WHERE id=?",
    [req.params.id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Student Skill Deleted Successfully"
      });

    }
  );

});

module.exports = router;
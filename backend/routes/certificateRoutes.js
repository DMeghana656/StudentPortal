const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET Certificates
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM certificates",
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

// POST Certificate
router.post("/", (req, res) => {

  console.log("BODY RECEIVED:", req.body);

  const {
    student_id,
    certificate_name,
    issue_date
  } = req.body;

  db.query(
    "INSERT INTO certificates(student_id, certificate_name, issue_date) VALUES(?,?,?)",
    [student_id, certificate_name, issue_date],
    (err, result) => {

      if (err) {
        console.log("CERTIFICATE ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Certificate Added Successfully"
      });

    }
  );

});

// DELETE Certificate
router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM certificates WHERE certificate_id=?",
    [req.params.id],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Certificate Deleted Successfully"
      });

    }
  );

});

module.exports = router;
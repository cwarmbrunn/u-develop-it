const express = require("express");

// Set up env
require("dotenv").config();
const inputCheck = require("./utils/inputCheck");

// Require the mysql2 package that was installed
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Add Express Middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Connect to Database
const db = mysql.createConnection(
  {
    host: "localhost",

    // SQL Username Goes Here
    user: "root",

    // SQL Password Goes Here
    password: process.env.DB_PW,
    database: "election",
  },
  console.log("Connected to the election database ✅")
);

// GET ALL Candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.name
  AS party_name
  FROM candidates
  LEFT JOIN parties
  ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Success!", data: rows });
  });
});

// GET a single (1) candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name
  AS party_name
  FROM candidates
  LEFT JOIN parties
  ON candidates.party_id = parties.id
  WHERE candidates.id =`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success!🎆",
      data: row,
    });
  });
});

// Delete a Candidate
app.delete("/api/candidate/:id", (req, res) => {
  // Set up SQL command - we want to delete candidates with the input id
  const sql = `DELETE FROM candidates WHERE id = ?`;
  // Set up parameters
  const params = [req.params.id];

  // Dataabse Query Set Up
  db.query(sql, params, (err, result) => {
    // IF ERROR
    if (err) {
      // Send a Status Message of 400
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({ message: "Candidate not found!" });
    } else {
      res.json({
        message: "Deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Create a Candidate
// POST request that uses object destructuring to pull the body property out of the request object
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Success!", data: body });
  });
});

app.use((req, res) => {
  res.status(404).end();
});

// App Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

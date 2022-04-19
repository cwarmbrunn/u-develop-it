const express = require("express");

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
    password: "pFj4VA#$rkQ6V4XZ",
    database: "election",
  },
  console.log("Connected to the election database ✅")
);

// GET a single (1) candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });
// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// VALUES (?,?,?,?)`;

// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
// Delete a Candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });
// THIS MUST BE LAST OR IT WILL OVERRIDE OTHER METHODS
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// App Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

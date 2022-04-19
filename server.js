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

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});
// THIS MUST BE LAST OR IT WILL OVERRIDE OTHER METHODS
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// App Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

// Require mysql
const mysql = require("mysql2");
// Set up dotenv (Password)
require("dotenv").config();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: process.env.DB_PW,
  database: "election",
});

module.exports = db;

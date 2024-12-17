const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "Banunithi544@", 
  database: "employees", 
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

app.post("/api/employees", (req, res) => {
  const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;

  const query = `
    INSERT INTO employees (name, employeeId, email, phoneNumber, department, dateOfJoining, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, employeeId, email, phoneNumber, department, dateOfJoining, role],
    (err, results) => {
      if (err) {
        console.error("Error inserting employee:", err);
        res.status(500).json({ error: "Failed to add employee." });
      } else {
        res.status(200).json({ message: "Employee added successfully!" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at 5000`);
});

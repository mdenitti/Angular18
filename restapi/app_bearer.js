// Importations
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware

// Variables
const app = express();
const port = 3000;

// Initialization of database
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'welcome123',
  database: 'xmas2023'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middlewares
app.use(express.json()); // Parse JSON data
app.use(cors()); // enable CORS

// Routes
app.get('/', (req, res) => {
  res.send('Ho Ho Ho - Welcome to our restapi!');
});

// User endpoints
app.get('/users', (req, res) => {
  // Validate bearer token
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  // Check if token is valid
  // (Use a token validation mechanism here)

  // If token is valid, fetch users data
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result)
  })
});

// Present endpoints
app.get('/presents', (req, res) => {
  // Validate bearer token
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  // Check if token is valid
  // (Use a token validation mechanism here)

  // If token is valid, fetch presents data
  db.query(`SELECT presents.id as id, title, users.name as owner, price, done FROM presents
  JOIN users ON users.id = presents.owner_id`, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result)
  })
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
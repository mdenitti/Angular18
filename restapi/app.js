// importation of dependencies
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware

// initialisation
const app = express();
const port = 3000;

// initialisation of database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'welcome123',
    database: 'xmas2023'
});

// connection
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// middleware to parse JSON
app.use(express.json());

// Use cors middleware to enable all CORS origins
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('Ho Ho Ho - Welcome to our restapi!');
});

// User eindpoints
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result)
    })
});

// present eindpoints
app.get('/presents', (req, res) => {
    db.query(`SELECT presents.id as id, title, users.name as owner, price, done FROM presents
    JOIN users ON users.id = presents.owner_id`, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result)
    })
});


// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
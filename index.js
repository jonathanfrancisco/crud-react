
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./db/mysql2.js');
const app = express();
app.use(bodyParser.json());

// fetches all students
app.get('/api/students', (req, res) => {
    
    mysql.connect()
    .then((connection) => {
        connection.query('SELECT * FROM student')
        .then((results) => {
            const [rows, fields] = results;
            connection.end();
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });

});

// fetches 1 student by id
app.get('/api/students/:id', (req, res) => {
    const {id} = req.params;
    mysql.connect()
    .then((connection) => {
        connection.query('SELECT * FROM student WHERE id = ?', [id])
        .then((results) => {
            const [rows, fields] = results;
            res.json(rows[0]);
        });
    })
    .catch((err) => {
        console.log(err);
    });
});



app.listen(process.env.PORT || 3000, () => {
    console.log('Started listening on port: ', process.env.PORT || 3000);
});
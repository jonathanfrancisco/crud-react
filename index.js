
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./db/mysql2.js');
const path = require('path');
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

// adds new student
app.post('/api/students', (req, res) => {
    const student = req.body;
    mysql.connect()
    .then((connection) => {
        connection.query('INSERT INTO student SET ?', student)
        .then(([result]) => {
            if(result.affectedRows)
                res.json({
                    status: true
                });
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

app.use(express.static(path.join(__dirname+'/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Started listening on port: ', process.env.PORT || 5000);
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./db/mysql2.js');
const app = express();
app.use(bodyParser.json());


app.listen(process.env.PORT || 3000, () => {
    console.log('Started listening on port: ', process.env.PORT || 3000);
});
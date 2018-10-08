


const mysql2 = require('mysql2/promise');


module.exports.connect = () => {
    return mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mathematics',
        database: 'crudreact'
    });
}
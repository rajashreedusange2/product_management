// exports.user = 'dipaknmane@gmail.com';
// exports.pass = 'Dipak122136';
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_database'
});

connection.connect();
module.exports.localConnect = connection;

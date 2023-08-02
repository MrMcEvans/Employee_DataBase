const mysql = require('mysql2');



const connection = mysql.createConnection(
    {
      host: 'localhost',
      port: '3001',
      user: 'root',
      password: 'McClellan17!',
      database: 'employee_db'
    },
    console.log('Connected to the employee database')
    );
//TODO create connection function
connection.connect()
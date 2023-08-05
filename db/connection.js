const mysql = require('mysql2');


function createDbConnection(){
  const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'McClellan17!',
      database: 'employee_db'
    },
    )

  connection.connect(error => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Connected to employee database!")
  })
  return connection;
}
//TODO create connection function

createDbConnection()
module.exports = createDbConnection
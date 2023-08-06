
const inquirer = require('inquirer');

const createDbConnection = require('./db/connection')



function init(){
    const db = createDbConnection()
    inquirer.prompt([{
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
            {choices: "view all departments", value: "view_department"},
            {choices: "view all employees", value: "view_employees"},
            {choices: "view all roles", value: "view_roles"},
            {choices: "add a department", value: "add_department"},
            {choices: "add an employee", value: "add_employee"},
            {choices: "update an employee role", value: "update_roll"},
        ],
    }
]).then((answers) => {
    const userChoice = answers.choices;
    if (userChoice === "view_department"){
        db.query("SELECT * FROM department", (error, results) => {
            if (error) throw error;
            console.log(results);
        });
    }else if (userChoice === 'view_employees') {
        db.query('SELECT * FROM employee', (error, results) => {
          if (error) throw error;
          console.log(results) 
        });
    }else if (userChoice === 'view_roles') {
        db.query('SELECT * FROM job', (error, results) => {
          if (error) throw error;
          console.log(results); 
        });
    }else if (userChoice === "add_employee") {
        inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID of the employee:',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID of the employee (if applicable, otherwise leave blank):',
        }
    ]).then((answers) => {
        const firstName = answers.firstName;
        const lastName = answers.lastName;
        const roleID = answers.roleId;
        const manager = answers.managerId;
        const query = 'INSERT INTO employee (firstName, lastName, job_id, manager_id) VALUES (?, ?, ?, ?)';
        const values = [firstName, lastName, roleID, manager];

        db.query(query, values, (err, result) => {
            if(err) throw err;
        })
    })
    }else if (userChoice === "add_department") {
        inquirer.prompt([{
            type: "input",
            name: "departmentName",
            message: "Please enter the department name"
        },
        {
            type: "input",
            name: "departmetnId",
            message: "Please enter a department ID"
        },
    ]).then((answers) => {
        
    })
    }
})
};



init();

const inquirer = require('inquirer');

const createDbConnection = require('./db/connection')

const db = createDbConnection()
    

function init(){

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
        db.query("SELECT * FROM departments", (error, results) => {
            if (error) throw error;
            console.log(results);
        });
    }else if (userChoice === 'view all employees') {
        db.query('SELECT * FROM employees', (error, results) => {
          if (error) throw error;
          console.log(results) 
        });
    }else if (userChoice === 'view all roles') {
        db.query('SELECT * FROM roles', (error, results) => {
          if (error) throw error;
          console.log(results); 
        });
    }else if (userChoice === "add an employee") {
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
        const roleID = answers.roleID;
        const manager = answers.managerID || null;
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const values = [firstName, lastName, roleID, manager];

        db.query(query, values, (err, result) => {
            if(err) throw error;
        })
    })
    }else if (userChoice === "add a department") {
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
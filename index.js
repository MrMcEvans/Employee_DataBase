const db = require('./db/connection');
const inquirer = require('inquirer');

async function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: [
                "view_department",
                "view_employees",
                "view_roles",
                "add_department",
                "add_employee",
                "update_role",
                "exit"
            ]
        }
    ]).then((answers) => {
        const userChoice = answers.choices;
        if (userChoice === "view_department") {
            db.query("SELECT * FROM department", (error, results) => {
                if (error) throw error;
                console.log(results);
                init()
            });
        } else if (userChoice === 'view_employees') {
            db.query("SELECT * FROM employee", (error, results) => {
                if (error) throw error;
                console.log(results);
                  init()
            });
        } else if (userChoice === 'view_roles') {
            db.query("SELECT * FROM job", (error, results) => {
                if (error) throw error;
                console.log(results);
                  init()
            });
        } else if (userChoice === "add_employee") {
            inquirer.prompt([
                {
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
                    if (err) throw err;
                    console.log("Employee added!");
                    init();
                });
            });
        } else if (userChoice === "add_department") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "departmentId",
                    message: "Please enter the department ID"
                },
                {
                    type: "input",
                    name: "departmentName",
                    message: "Please enter a department name"
                },
            ]).then((answers) => {
                const departmentName = answers.departmentName;
                const departmentId = answers.departmentId;
                const departmentQuery = 'INSERT INTO department (id, name)  VALUES (?, ?)';
                const departmentValues = [departmentId, departmentName];

                db.query(departmentQuery, departmentValues, (err, results) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("Department added!");
                        init();
                    }
                });
            });
        } else if (userChoice === "update_role") {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleToUpdate',
                    message: 'Which role would you like to update?',
                    choices: [
                        "Health Class Professional",
                        "Rocket League Coach",
                        "Closet Expert",
                        "Romantic Consultant",
                        "Bong Specialist",
                    ]
                }
            ]).then((answers) => {
                const roleToUpdate = answers.roleToUpdate;

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newJobTitle',
                        message: 'Enter the new job title:',
                    },
                    {
                        type: 'input',
                        name: 'newSalary',
                        message: 'Enter the new salary:',
                    },
                ]).then((newData) => {
                    const newJobTitle = newData.newJobTitle;
                    const newSalary = newData.newSalary;
                    const query = 'UPDATE job SET job_title = ?, salary = ? WHERE job_title = ?';
                    const values = [newJobTitle, newSalary, roleToUpdate];

                    db.query(query, values, (err, result) => {
                        if (err) throw err;
                        console.log(`Role ${roleToUpdate} updated successfully.`);
                        init();
                    });
                });
            });
        }
    });
}

init();

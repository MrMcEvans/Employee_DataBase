const db = require('./db/connection');
const inquirer = require('inquirer');

async function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
          'view_employees',
          'add_employee',
          'update_employee',
          'view_department',
          'add_department',
          'view_roles',
          'add_role',
          'exit',
        ],
      },
    ])
    .then((answers) => {
      const userChoice = answers.choices;
      if (userChoice === 'view_department') {
        db.query('SELECT * FROM department', (error, results) => {
          if (error) throw error;
          console.table(results);
          init();
        });
      } else if (userChoice === 'view_employees') {
        db.query('SELECT * FROM employee', (error, results) => {
          if (error) throw error;
          console.table(results);
          init();
        });
      } else if (userChoice === 'view_roles') {
        db.query('SELECT * FROM job', (error, results) => {
          if (error) throw error;
          console.table(results);
          init();
        });
      } else if (userChoice === 'add_employee') {
        inquirer
          .prompt([
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
              message:
                'Enter the manager ID of the employee (if applicable, otherwise leave blank):',
            },
          ])
          .then((answers) => {
            const firstName = answers.firstName;
            const lastName = answers.lastName;
            const roleID = answers.roleId;
            const manager = answers.managerId;
            const query =
              'INSERT INTO employee (firstName, lastName, job_id, manager_id) VALUES (?, ?, ?, ?)';
            const values = [firstName, lastName, roleID, manager];

            db.query(query, values, (err, result) => {
              if (err) throw err;
              console.log('Employee added!');
              init();
            });
          });
      } else if (userChoice === 'add_department') {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'departmentId',
              message: 'Please enter the department ID',
            },
            {
              type: 'input',
              name: 'departmentName',
              message: 'Please enter a department name',
            },
          ])
          .then((answers) => {
            const departmentName = answers.departmentName;
            const departmentId = answers.departmentId;
            const departmentQuery =
              'INSERT INTO department (id, name)  VALUES (?, ?)';
            const departmentValues = [departmentId, departmentName];

            db.query(departmentQuery, departmentValues, (err, results) => {
              if (err) {
                throw err;
              } else {
                console.log('Department added!');
                init();
              }
            });
          });
      } else if (userChoice === 'add_role') {
        inquirer
          .prompt([
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
          ])
          .then((answers) => {
            const jobTitle = answers.newJobTitle;
            const jobSalary = answers.newSalary;
            const query = `INSERT INTO job (title, salary) VALUES (?, ?)`;
            const values = [jobTitle, jobSalary];

            db.query(query, values, (err, result) => {
              if (err) throw err;
              console.log(`Role ${jobTitle} added successfully.`);
              init();
            });
          });
      } else if (userChoice === 'update_employee') {
        db.query(
          'SELECT id, firstName, lastName FROM employee',
          (err, employees) => {
            if (err) throw err;

            const employeeChoices = employees.map((employee) => ({
              name: `${employee.firstName} ${employee.lastName}`,
              value: employee.id,
            }));

            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'employeeId',
                  message: 'Choose the employee you want to update:',
                  choices: employeeChoices,
                },
                {
                  type: 'input',
                  name: 'firstName',
                  message:
                    'Enter the new first name (leave blank to keep existing):',
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message:
                    'Enter the new last name (leave blank to keep existing):',
                },
                {
                  type: 'input',
                  name: 'roleId',
                  message:
                    'Enter the new role ID (leave blank to keep existing):',
                },
                {
                  type: 'input',
                  name: 'managerId',
                  message:
                    'Enter the new manager ID (leave blank to keep existing):',
                },
              ])
              .then((answers) => {
                const employeeId = answers.employeeId;
                const firstName = answers.firstName || null; // Use null if no input
                const lastName = answers.lastName || null;
                const roleId = answers.roleId || null;
                const managerId = answers.managerId || null;

                // Construct the UPDATE query based on provided inputs
                const query = 'UPDATE employee SET ? WHERE id = ?';
                const values = [
                  {
                    firstName,
                    lastName,
                    job_id: roleId,
                    manager_id: managerId,
                  },
                  employeeId,
                ];

                db.query(query, values, (err, result) => {
                  if (err) throw err;
                  console.log('Employee updated!');
                  init();
                });
              });
          }
        );
      }else if (userChoice === 'exit') {
        db.end();
        console.log('Goodbye!');
      }
    });
}

init();

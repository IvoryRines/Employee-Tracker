const inquirer = require("inquirer");
const { db } = require('./db');


// Function to add a new department
async function addDepartment(mainMenu) {
  // Prompt the user for the department name
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department?',
    },
  ]).then((answers) => {
    const departmentName = answers.departmentName;
    // Insert the new department into the database
    db.query("INSERT INTO department (dept_name) VALUES ($1)", [departmentName], function (err, result) {
      if (err) {
        console.error('Error adding department:', err);
      } else {
        console.log('Department added successfully!');
      }
      // Return to the main menu
      mainMenu();
    });
  });
};


// Function to add a new role
async function addRole(mainMenu) {
  // Fetch all departments to provide as choices
  const dept = await db.query("SELECT * FROM department");
  const deptChoices = dept.rows.map(({ id, dept_name }) => ({
    name: dept_name,
    value: id,
  }));
  // Prompt the user for the role details
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What is the name of the role?',
    },
    {
      type: 'number',
      name: 'roleSalary',
      message: 'What is the salary of the role?',
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message: 'Which department does the role belong to?',
      choices: deptChoices,
    },
  ]).then((answers) => {
    const { roleTitle, roleSalary, roleDepartment } = answers;
    // Insert the new role into the database
    db.query("INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)", [roleTitle, roleSalary, roleDepartment], function (err, result) {
      if (err) {
        console.error('Error adding role:', err);
      } else {
        console.log('Role added successfully!');
      }
      // Return to the main menu
      mainMenu();
    });
  });
};


// Function to add a new employee
async function addEmployee(mainMenu) {
  // Fetch all roles to provide as choices
  const roles = await db.query("SELECT * FROM role");
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  // Fetch all employees to provide as manager choices
  const managers = await db.query("SELECT * FROM employee");
  const managerChoices = managers.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  // Add an option for no manager
  managerChoices.unshift({
    name: `None`,
    value: null,
  });
  // Prompt the user for the employee details
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employee\'s first name?',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employee\'s last name?',
    },
    {
      type: 'list',
      name: 'employeeRole',
      message: 'What is the employee\'s role?',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'employeeManager',
      message: 'Who is the employee\'s manager?',
      choices: managerChoices,
    },
  ]).then((answers) => {
    const { firstName, lastName, employeeRole, employeeManager } = answers;
    // Insert the new employee into the database
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, employeeRole, employeeManager], function (err, result) {
      if (err) {
        console.error('Error adding employee:', err);
      } else {
        console.log('Employee added successfully!');
      }
      // Return to the main menu
      mainMenu();
    });
  });
};


// Function to update an employee's role
async function updateEmployeeRole(mainMenu) {
  // Fetch all employees to provide as choices
  const employees = await db.query("SELECT * FROM employee");
  const employeeChoices = employees.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  // Fetch all roles to provide as choices
  const roles = await db.query("SELECT * FROM role");
  const roleChoices = roles.rows.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  // Fetch all employees again to provide as manager choices
  const managers = await db.query("SELECT * FROM employee");
  const managerChoices = managers.rows.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  // Add an option for no manager
  managerChoices.unshift({
    name: `None`,
    value: null,
  });
  // Prompt the user for the employee and new role details
  inquirer.prompt([
    {
      type: 'list',
      name: 'employeeToUpdate',
      message: 'Which employee\'s role would you like to update?',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'newRole',
      message: 'What is the employee\'s new role?',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'employeeManager',
      message: 'Who is the employee\'s new manager?',
      choices: managerChoices,
    },
  ]).then((answers) => {
    const { employeeToUpdate, newRole, employeeManager } = answers;
    // Update the employee's role and manager in the database
    db.query("UPDATE employee SET role_id = $1, manager_id = $2 WHERE id = $3", [newRole, employeeManager, employeeToUpdate], function (err, result) {
      if (err) {
        console.error('Error updating employee role:', err);
      } else {
        console.log('Employee role updated successfully!');
      }
      // Return to the main menu
      mainMenu();
    });
  });
};


// Export the functions
module.exports = {
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
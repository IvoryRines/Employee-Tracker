const inquirer = require("inquirer");
const { db } = require('./utils/db');
const { addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./utils/modifyFunctions');


function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      if (response.action === "View All Departments") {
        viewDepartments();
      } else if (response.action === "View All Roles") {
        viewRoles();
      } else if (response.action === "View All Employees") {
        viewEmployees();
      } else if (response.action === "Add Department") {
        addDepartment(mainMenu);
      } else if (response.action === "Add Role") {
        addRole(mainMenu);
      } else if (response.action === "Add Employee") {
        addEmployee(mainMenu);
      } else if (response.action === "Update Employee Role") {
        updateEmployeeRole(mainMenu);
      } else {
        process.exit();
      }
    });
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, { rows }) {
    console.table(rows);
    mainMenu();
  });
};

function viewRoles() {
    db.query("SELECT role.id, role.title, department.dept_name, role.salary FROM role JOIN department ON role.department = department.id", function (err, { rows }) {
      console.table(rows);
      mainMenu();
    });
};

function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id", function (err, { rows }) {
      console.table(rows);
      mainMenu();
    });
};


mainMenu();

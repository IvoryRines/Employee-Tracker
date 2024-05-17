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


// async function addDepartment() {

//   const dept = await db.query("SELECT * FROM department");
//   inquirer.prompt( [
//     {
//       type: 'input',
//       name:'departmentName',
//       message: 'What is the name of the department?',
      
//   },
// ]).then((answers) => {
//     const departmentName = answers.departmentName;

//     db.query("INSERT INTO department (dept_name) VALUES ($1)", [departmentName], function (err, result) {
//       if (err) {
//         console.error('Error adding department:', err);
//       } else {
//         console.log('Department added successfully!');
//       }
//       mainMenu();
//     });
//   })
// };

// async function addRole() {

//   const dept = await db.query("SELECT * FROM department");
//   const deptChoices = dept.rows.map(({id,dept_name}) => 
//       ({
//           name: dept_name ,
//           value: id,
//       })
//   );
//   inquirer.prompt( [
//     {
//         type: 'input',
//         name:'roleTitle',
//         message: 'What is the name of the role?',
        
//     },

//     {
//         type: 'number',
//         name:'roleSalary',
//         message: 'What is the salary of the role?',
        
//     },

//     {
//         type: 'list',
//         name: 'roleDepartment',
//         message: 'Which department does the role belong to?',
//         choices: deptChoices
//     },
// ]).then((answers) => {
//     const { roleTitle, roleSalary, roleDepartment } = answers;

//     db.query("INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)", [roleTitle, roleSalary, roleDepartment], function (err, result) {
//       if (err) {
//         console.error('Error adding role:', err);
//       } else {
//         console.log('Role added successfully!');
//       }
//       mainMenu();
//     });
//   })
// };


// async function addEmployee() {

//   const roles = await db.query("SELECT * FROM role");
//   const roleChoices = roles.rows.map(({id,title}) => 
//       ({
//           name: title,
//           value: id,
//       })
//   );

//   const managers = await db.query("SELECT * FROM employee");
//   const managerChoices = managers.rows.map(({id, first_name, last_name}) =>
//       ({
//         name: `${first_name} ${last_name}`,
//         value: id,
//       })
//   );

//   managerChoices.unshift({
//     name: `None`,
//     value: null,
//   });

//   inquirer.prompt( [
//     {
//       type: 'input',
//       name:'firstName',
//       message: 'What is the employee\'s first name?',
      
//   },

//   {
//       type: 'input',
//       name:'lastName',
//       message: 'What is the employee\'s last name?',
      
//   },

//   {
//       type: 'list',
//       name: 'employeeRole',
//       message: 'What is the employee\'s role?',
//       choices: roleChoices
//   },

//   {
//       type: 'list',
//       name: 'employeeManager',
//       message: 'Who is the employee\'s manager?',
//       choices: managerChoices
//   },

// ]).then((answers) => {
//     const { firstName, lastName, employeeRole, employeeManager } = answers;

//     db.query("INSERT INTO employee (first_name, last_name,  role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, employeeRole, employeeManager], function (err, result) {
//       if (err) {
//         console.error('Error adding employee:', err);
//       } else {
//         console.log('Employee added successfully!');
//       }
//       mainMenu();
//     });
//   })
// };


// async function updateEmployeeRole() {

//   const employees = await db.query("SELECT * FROM employee");
//   const employeeChoices = employees.rows.map(({id, first_name, last_name}) =>
//       ({
//         name: `${first_name} ${last_name}`,
//         value: id,
//       })
//   );

//   const roles = await db.query("SELECT * FROM role");
//   const roleChoices = roles.rows.map(({id, title}) => 
//       ({
//           name: title,
//           value: id,
//       })
//   );

//   const managers = await db.query("SELECT * FROM employee");
//   const managerChoices = managers.rows.map(({id, first_name, last_name}) =>
//       ({
//         name: `${first_name} ${last_name}`,
//         value: id,
//       })
//   );

//   managerChoices.unshift({
//     name: `None`,
//     value: null,
//   });

//   inquirer.prompt( [
//     {
//       type: 'list',
//       name: 'employeeToUpdate',
//       message: 'Which employee\'s role would you like to update?',
//       choices: employeeChoices
//   },

//   {
//       type: 'list',
//       name: 'newRole',
//       message: 'What is the employee\'s new role?',
//       choices: roleChoices
//   },

//   {
//     type: 'list',
//     name: 'employeeManager',
//     message: 'Who is the employee\'s new manager?',
//     choices: managerChoices
//   },

// ]).then((answers) => {
//     const { employeeToUpdate, newRole, employeeManager } = answers;

//     db.query("UPDATE employee SET role_id = $1, manager_id = $2 WHERE id = $3",
//     [newRole, employeeManager, employeeToUpdate], function (err, result) {
//       if (err) {
//         console.error('Error updating employee role:', err);
//       } else {
//         console.log('Employee role updated successfully!');
//       }
//       mainMenu();
//     });
//   })
// };

mainMenu();

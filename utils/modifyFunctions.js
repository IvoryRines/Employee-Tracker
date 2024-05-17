const inquirer = require("inquirer");
const { db } = require('./db');



// function to add a new department
async function addDepartment(mainMenu) {
    inquirer.prompt( [
        {
            type: 'input',
            name:'departmentName',
            message: 'What is the name of the department?',
        },
  ]).then((answers) => {
      const departmentName = answers.departmentName;
  
      db.query("INSERT INTO department (dept_name) VALUES ($1)", [departmentName], function (err, result) {
        if (err) {
          console.error('Error adding department:', err);
        } else {
          console.log('Department added successfully!');
        }
        mainMenu();
      });
  })
};
  

// function to add a new role
async function addRole(mainMenu) {
    const dept = await db.query("SELECT * FROM department");
    const deptChoices = dept.rows.map(({id,dept_name}) => 
        ({
            name: dept_name ,
            value: id,
        })
    );
    inquirer.prompt( [
      {
          type: 'input',
          name:'roleTitle',
          message: 'What is the name of the role?',
          
      },
      {
          type: 'number',
          name:'roleSalary',
          message: 'What is the salary of the role?',
          
      },
      {
          type: 'list',
          name: 'roleDepartment',
          message: 'Which department does the role belong to?',
          choices: deptChoices
      },
  ]).then((answers) => {
      const { roleTitle, roleSalary, roleDepartment } = answers;
  
      db.query("INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)", [roleTitle, roleSalary, roleDepartment], function (err, result) {
        if (err) {
          console.error('Error adding role:', err);
        } else {
          console.log('Role added successfully!');
        }
        mainMenu();
      });
  })
};
  

// function to add a new employee
async function addEmployee(mainMenu) {
    const roles = await db.query("SELECT * FROM role");
    const roleChoices = roles.rows.map(({id,title}) => 
        ({
            name: title,
            value: id,
        })
    );

    const managers = await db.query("SELECT * FROM employee");
    const managerChoices = managers.rows.map(({id, first_name, last_name}) =>
        ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
    );

    managerChoices.unshift({
      name: `None`,
      value: null,
    });
  
    inquirer.prompt( [
      {
        type: 'input',
        name:'firstName',
        message: 'What is the employee\'s first name?',
      },
      {
        type: 'input',
        name:'lastName',
        message: 'What is the employee\'s last name?',
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: managerChoices
      },
  
  ]).then((answers) => {
      const { firstName, lastName, employeeRole, employeeManager } = answers;
  
      db.query("INSERT INTO employee (first_name, last_name,  role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, employeeRole, employeeManager], function (err, result) {
        if (err) {
          console.error('Error adding employee:', err);
        } else {
          console.log('Employee added successfully!');
        }
        mainMenu();
      });
  })
};
  

// function to update an employee role
async function updateEmployeeRole(mainMenu) {
  const employees = await db.query("SELECT * FROM employee");
    const employeeChoices = employees.rows.map(({id, first_name, last_name}) =>
        ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
    );
  
    const roles = await db.query("SELECT * FROM role");
    const roleChoices = roles.rows.map(({id, title}) => 
        ({
          name: title,
          value: id,
        })
    );
  
    const managers = await db.query("SELECT * FROM employee");
    const managerChoices = managers.rows.map(({id, first_name, last_name}) =>
        ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
    );
  
    managerChoices.unshift({
      name: `None`,
      value: null,
    });
  
    inquirer.prompt( [
      {
        type: 'list',
        name: 'employeeToUpdate',
        message: 'Which employee\'s role would you like to update?',
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'newRole',
        message: 'What is the employee\'s new role?',
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s new manager?',
        choices: managerChoices
      },
  
  ]).then((answers) => {
      const { employeeToUpdate, newRole, employeeManager } = answers;
  
      db.query("UPDATE employee SET role_id = $1, manager_id = $2 WHERE id = $3",
      [newRole, employeeManager, employeeToUpdate], function (err, result) {
        if (err) {
          console.error('Error updating employee role:', err);
        } else {
          console.log('Employee role updated successfully!');
        }
        mainMenu();
      });
  })
};


module.exports = {
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};


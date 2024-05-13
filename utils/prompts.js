// An array of questions for user input
const mainMenu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name:'action',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },
];

const addEmployee = [
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
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
    },

    {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
    },
];

const addRole = [
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
        choices: ['Engineering', 'Finance', 'Legal', 'Sales',]
    },
];

const addDepartmentPrompt = [
    {
        type: 'input',
        name:'departmentName',
        message: 'What is the name of the department?',
        
    },
];


module.exports = { mainMenu, addEmployee, addRole, addDepartment }


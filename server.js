const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'pwd123',
    database: 'employees_db',
});

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name:'action',
        choices: [],
    },

    {
        type: '',
        message: '',
        name: '',
        choices: [],
    },
]);

pool.connect();

app.listen(PORT, () => {
    console.log('Hey you did it!');
});

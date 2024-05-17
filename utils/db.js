//Connect to db

const { Pool } = require('pg');


const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "pwd123",
  database: "employees_db",
});


module.exports = { db };
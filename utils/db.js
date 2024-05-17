// Import the Pool class from the pg module to manage PostgreSQL connections
const { Pool } = require('pg');

// Create a new Pool instance to manage database connections
const db = new Pool({
  host: "localhost",       
  user: "postgres",        
  password: "pwd123",      
  database: "employees_db" 
});

// Export the db instance to be used in other modules
module.exports = { db };
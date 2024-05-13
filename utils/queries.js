// Query database
pool.query('SELECT * FROM employees', function (err, {rows}) {
    console.log(rows);
  });



// class Display {
//     constructor(shapeColor, textColor, text) {
      
//         this.shapeColor = shapeColor;
//         this.textColor = textColor;
//         this.text = text;
        
//     }
// };

// class Employees extends Display {
//     SELECT * FROM employees;


// class Roles extends Display {
//     SELECT * FROM roles;
// }

// class Departments   extends Display{
//     SELECT * FROM departments;
// }


// module.exports = { Employees, Roles, Departments };
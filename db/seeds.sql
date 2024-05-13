INSERT INTO departments (db_name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');


INSERT INTO roles (title, salary, department)
VALUES ('Sales Lead', 100000, 4),
       ('Salesperson', 80000, 4),
       ('Lead Engineer', 1500001, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 160000, 2),
       ('Accountant', 125000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Aino', 'Aaltonen', 1, NULL),
       ('Benjamin', 'Bautista', 2, 1),
       ('Chen', 'Chiu', 3, NULL),
       ('David', 'Davenport', 4, 3),
       ('Fatima', 'Fernandez', 5, NULL),
       ('Gabriel', 'Gomez', 6, 5),
       ('Hiroko', 'Hasegawa', 7, NULL),
       ('Isabella', 'Ibrahim', 8, 7);
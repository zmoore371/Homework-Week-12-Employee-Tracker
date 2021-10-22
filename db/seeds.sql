INSERT INTO department (id, name)
VALUES  (1,"Sales"),
        (2, "Engineering"),
        (3, "Legal"),
        (4, "Finance");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 1),
        (2, "Salesperson", 80000, 1),
        (3, "Lead Engineer", 150000, 2),
        (4, "Software Engineer", 120000, 2),
        (5, "Account Manager", 160000, 4),
        (6, "Accountant", 125000, 4),
        (7, "Legal Team Lead", 256000, 3),
        (8, "Lawyer", 190000, 3);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES  (1, "John", "Doe", 1, NULl),
        (2, "Mike", "Chan", 2, 1),
        (3, "Ashely", "Rodriguez", 3, NULL),
        (4, "Kevin", "Spacey", 4, 3),
        (5, "Jason", "Johnson", 5, NULL),
        (6, "Justin", "Hall", 6, 5),
        (7, "Jeff", "Longbottom", 7, NULL),
        (8, "Nelson", "Villalalopez", 8, 7);
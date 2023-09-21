INSERT INTO employee (id, firstName, lastName, job_id, manager_id)
VALUES(1, "Elias", "Vergos", 2, 69),
      (2, "Collin", "Cross", 4, 420),
      (4, "Dante", "Guizotti", 4, 21),
      (3, "Noah", "Tysiac", 3, 8008),
      (5, "Adam", "Sumner", 1, 42);

INSERT INTO job (id, title, salary, department_id)
VALUES(2, "Health Class Professional", 100000.00, 2),
      (3, "Rocket League Coach", 10.00, 3),
      (2, "Closet Expert", 47500.00, 1),
      (2, "Romantic Consultant", 1.00, 4),
      (2, "Bong Specialist", 1000000.00, 5);

INSERT INTO department(id, title)
VALUES(2, "Student Wellness"),
      (3, "Talent Department"),
      (1, "Mental Health"),
      (4, "Touch Grass Department"),
      (5, "Comp Loss Depression");

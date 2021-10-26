const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table")
const { restoreDefaultPrompts } = require("inquirer");



// const dbCredientials = {
//     host: 'localhost',
//     user: 'root',
//     port: 3306,
//     password: '12345678',
//     database: 'workforce_db'
// }

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'week12',
    port: 3306,
    password: '99999999',
    database: 'workforce_db'
    }
);

db.connect((err) => {
    if(err) {
        console.log(err)
    }    
    console.log("connected to database")
    db.query("SELECT * FROM roles", (err, result) => {
        if(err) {
            console.log(err)
        }
        // console.log(result)
        mainMenu();
    })
});

mainMenu = () => {
    inquirer
        .prompt([
            {
            type: 'list',
            message: "What would you like to do?",
            name: 'operationSelection',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            }
        ])

        .then((answer) => {
            
            switch(answer.operationSelection) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;  
                case "Update Employee Role":
                    updateRole();
                    break;  
                case "View All Roles":
                    viewAllRoles();
                    break;  
                case "Add Role":
                    addRole()
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":

                    break;
                case "Quit":
                    process.exit(1)
                    break;

            }
                
        }) 
}    

viewAllEmployees = () => {
    
    db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) As manager
    FROM employee e
    LEFT JOIN roles r
        ON e.roles_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m 
        ON m.id = e.manager_id`,
        
    // "SELECT * FROM employee", 
    
    (err, results) => {
        if(err){
            console.log(err)
            mainMenu();
            return;
        }
        console.table(results)
        return mainMenu();
    })
}


addEmployee = () => {
    let managers = [];
    let rolesArr = [];
   
    db.query("Select title from roles", (err, results) => {
        if (err) {
            throw err
        } else {
            for(let i=0; i<results.length; i++){
            rolesArr.push(results[i].title)   
        }
        }

    })

    db.query("SELECT first_name, last_name, manager_id FROM employee WHERE manager_id IS NOT NULL", (err, results) => {
        if (err) {
           throw err
        } else {
            for(let i=0; i<results.length; i++){
            managers.push(`${results[i].first_name} ${results[i].last_name} id: ${results[i].manager_id}`)  
        }
        }

    }) 

    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employees first name?"
            },
            {
                type: "input", 
                name: "last_name",
                message: "What is the employees last name?"
            },
            {
                type: "list",
                name: "title",
                message: "What is the employees role?",
                choices: rolesArr
            },
            {
                type: "input",
                name: "salary",
                message: "What is the employees yearly salary?"
            },
            {
                type: "confirm",
                name: "isManager",
                message: "Is this person a manager?",
                default: false
            }
        ])
        


    .then(data => {
        let first = data.first_name;
        let last = data.last_name;
        let roleId = rolesArr.indexOf(data.title)+1 



       if(data.isManager === true) {
            db.query("INSERT INTO employee SET ?", 
            {
                first_name: first,
                last_name: last,
                roles_id: roleId
            })
            console.log("Successfully added manager!")
            mainMenu();
        }
        else{
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is this employees manager?",
                        choices: managers
                    }
                ])
                .then(data => {
                    //tun last digits of managers array into number again 
                    var manId = data.manager.match(/\d+/)
                    db.query("INSERT INTO employee SET ?",
                        {
                            first_name: first,
                            last_name: last,
                            roles_id: roleId,
                            manager_id: manId
                        } 
                    )
                    console.log("Successfully added employee and assigned their manager!")
                    mainMenu();
                })
        }



    })
}

updateRole = () => {
    //get all employees to list
    // get all avaliable roles to list 
    
    inquirer
        .prompt([
            {
            type: "list",
            name: "selectedEmployee",
            message: "Chose employee to update role:",
            choices: "CHOICE ARRAY"
            }
        ])
        .then
            //selected employee
            inquirer 
                .prompt([
                    {
                        type: "list",
                        name: "newRole",
                        message: "What is the employees new role",
                        choices: "CHOICE ARRAY"
                    }
                ])
        .then
            //insert new changes into database, return to main

}

viewAllRoles = () => {
    db.query("SELECT * FROM roles", (err, results) => {
        if(err){
            console.log(err)
        }
        console.table(results)
        mainMenu();
    })

}  

addRole = () => {
    
    inquirer
        .prompt([
            {
                type: "input",
                name: "role",
                message: "What is the name of the new role?"
            },
            {
                type: "list",
                name: "department",
                message: "What department does this role belong to?",
                choices: "DEPARTMENT ARRAY"
            }
        ])
        .then
            //INSERT THAT SHIT
}

viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, results) => {
        if(err){
            console.log(err)
        }
        console.table(results)
    })
    mainMenu()
}







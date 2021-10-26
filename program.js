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

                    break;  
                case "View All Roles":
                    viewAllRoles();
                    break;  
                case "Add Role":

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

// viewAllEmployees = () => {
    
//     db.query("SELECT * FROM employee", (err, results) => {
//         if(err){
//             console.log(err)
//         }
//         return console.table(results)
//     })
//     setTimeout (() => {
//     mainMenu()
//     },2000)
// }

const viewAllEmployees = () => {
    let query = ("SELECT * FROM employee")

    db.promise().query(query, (err, result) => {
        if(err) throw err;

        console.table(result)
    })
}

addEmployee = () => {
    // query db for list of avaliable roles to insert into question below
    
    
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
                name: "role",
                message: "INSERT ROLES TO CHOSE FROM HERE"
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
        // add check for manager or not here then insert everything into corresponding fields
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
        console.log("\n")
    })
    mainMenu()
    

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
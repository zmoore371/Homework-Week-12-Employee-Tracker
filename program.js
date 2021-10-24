const mysql = require("mysql2");
const inquirer = require("inquirer");



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
        console.log(result)
        mainMenu();
    })

    //put a function here to start program after successfully connecting

});

mainMenu = () => {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'operationSelection',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
            }
        ])

        .then((answer) => {
            
            switch(answer.operationSelection) {
                case "View All Employees":
                    console.log("Hello")
                    break;
                case "Add Employee":

                    break;  
                case "Update Employee Role":

                    break;  
                case "View All Roles":

                    break;  
                case "Add Role":

                    break;
                case "View All Departments":

                    break;
                case "Add Department":

                    break;
                case "Quit":
                    process.exit(1)
                    break;

            }
                
        }) 
}    
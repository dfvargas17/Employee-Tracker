const { prompt } = require("inquirer");
const logo = require("asciliart-logo");
const database = require("./db");
const { inherits } = require("util");
require("consolo.table");

init();

function init() {
    const logoText = logo({ name: "Employee Manager"}).render();
    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
            ]
        }

    ]).then(res => {
        let choice =res.choice;

        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDeparment();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
                default:
                quit();
        }    
    })
}

function viewEmployees() {
    database.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}


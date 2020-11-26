const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
var teamInfo = [];
var idValue = 1;
const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

async function teamData() {
    const managerInfo = await inquirer.prompt([
        {
            type: "input",
            name: "n",
            message: "Please add the name of the manager."
        },
        {
            type: "input",
            name: "e",
            message: "Please add the email of the manager."
        },
        {
            type: "input",
            name: "o",
            message: "Please add the office number for the manager."
        },
        {
            type: "input",
            name: "tN",
            message: "Please add the number of team members."
        }]
    )

    const manager = new Manager(managerInfo.n, idValue++, managerInfo.e, managerInfo.o)
    teamInfo.push(manager)

    for (let i = 0; i < managerInfo.tN; i++) {
        const employeeInfo = await inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: `What is the role of employee ${i + 1}?`,
                choices: ["Engineer", "Intern"]
            }]
        )

        // HINT: each employee type (manager, engineer, or intern) has slightly different
        // information; write your code to ask different questions via inquirer depending on
        // employee type.

        if (employeeInfo.role == "Engineer") {
            const engineerInfo = await inquirer.prompt([
                {
                    type: "input",
                    name: "n",
                    message: "Please add the name of the engineer."
                },
                {
                    type: "input",
                    name: "e",
                    message: "Please add the email of the emgineer."
                },
                {
                    type: "input",
                    name: "g",
                    message: "Please add the github username for the engineer."
                }]
            )
            const engineer = new Engineer (engineerInfo.n, idValue++, engineerInfo.e, engineerInfo.g)
            teamInfo.push(engineer)
        }
        else {
            const internInfo = await inquirer.prompt([
                {   type: "input",
                    name: "n",
                    message: "Please add the name of the intern."
                },
                {   type: "input",
                    name: "e",
                    message: "Please add the email of the intern."
                },
                {   type: "input",
                    name: "s",
                    message: "Please add the school of the intern."
                }]
            )
            const intern = new Intern(internInfo.n, idValue++, internInfo.e, internInfo.s)
            teamInfo.push(intern)
        }
    }

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!

    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR)
    fs.writeFileSync(outputPath, render(teamInfo), "utf-8");

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.

    console.log(`Your Team is Complete!: ${outputPath}`)
}
teamData()









import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import showBanner from "node-banner";


let sleep = (time = 2000) => new Promise((r) => setTimeout(r, time))

let banner = async () => {
    await showBanner(
        "Adventure Game"
    )
}

await banner();
await sleep(1000);

class Player {
    name: string;
    health: number = 100;

    constructor(name: string) {
        this.name = name;

    }
}

class Opponent {
    name: string;
    health: number = 100;

    constructor(name: string) {
        this.name = name;
    }
}

let { player } = await inquirer.prompt([{
    name: "player",
    type: "input",
    message: "Enter your name: "
}]);

let { opponent } = await inquirer.prompt([{
    name: "opponent",
    type: "list",
    message: "Select your opponent: ",
    choices: [`Skeleton`, `Warrior`, `Zombie`, `Assassin`]
}])

let play = new Player(player);
let opp = new Opponent(opponent);



console.log(chalk.bold(`Instructions:`));
console.log(`${chalk.redBright(`>>>`)} You can damage enemy upto 50 health`);
console.log(`${chalk.redBright(`>>>`)} Enemy can damage you upto 50 health`);

let spinner = createSpinner("Loading Game").start()
await sleep();
spinner.success({ text: "Game Loaded Sucessfully" })

let NoOfHealthPotion = 3;
let healthPotion = 30;

while (true) {
    console.log(chalk.blueBright(`\n=========================`))
    console.log(`${play.name} Health : ${play.health}`);
    console.log(`${opp.name} Health : ${opp.health}`);
    console.log(chalk.blueBright(`=========================\n`));

    console.log(`${chalk.yellowBright(`<<<<<<<<<<<<<<`)} ${chalk.blueBright(`${opponent} Has Appeared`)} ${chalk.yellowBright(`<<<<<<<<<<<<<<`)}`)

    if ([`Skeleton`, `Warrior`, `Zombie`, `Assassin`].includes(opponent)) {
        let { choices } = await inquirer.prompt([{
            name: "choices",
            type: "list",
            message: "What would you like to do? ",
            choices: ["Attack", "Drink Health Potion", "Run"]
        }]);

        if (choices === "Attack") {

            console.log((chalk.bgBlack.whiteBright(`\n ___________${chalk.bgRgb(0, 55, 0).greenBright(`/|${play.name}|*`)}${chalk.bgRgb(55, 0, 0).redBright(`*|${opp.name}|\\`)}___________`)))
            let playerDamage = Math.floor(Math.random() * 50)
            let opponentDamage = Math.floor(Math.random() * 50);

            play.health -= playerDamage;
            opp.health -= opponentDamage;

            if (play.health <= 0) {
                console.log(chalk.bold.redBright(`You Lose!`));
                console.log(`${chalk.redBright(`>>>`)} You have ${chalk.redBright(0)} health left.`);
                console.log(`${chalk.redBright(`>>>`)} ${opp.name} have ${chalk.redBright(opp.health)} health left`);
                break;
            } else if (opp.health <= 0) {
                console.log(chalk.bold.greenBright(`You Win!`));
                console.log(`${chalk.redBright(`>>>`)} You have ${chalk.redBright(play.health)} health left`);
                console.log(`${chalk.redBright(`>>>`)} ${opp.name} health is ${chalk.redBright(0)}.`);
                break;
            }
        };



        if (choices === "Drink Health Potion") {
            if (play.health >= 70) {
                console.log(`${chalk.redBright(`>>>`)} Sorry you can't drink health potion your health is greater than 50.`)
            } else if (NoOfHealthPotion < 1) {
                console.log(`${chalk.redBright(`>>>`)} Sorry you don't have more Health Potion.`)
            } else {
                play.health += healthPotion;
                NoOfHealthPotion -= 1;
                let spinner = createSpinner("Drinking health potion...").start();
                await sleep();
                spinner.success();
                console.log(`${chalk.redBright(`>>>`)} You drink a health potion, healing yourself for ${chalk.redBright(30)}`);
                console.log(`${chalk.redBright(`>>>`)} You now have ${chalk.redBright(play.health)} health.`);
                console.log(`${chalk.redBright(`>>>`)} You now have ${chalk.redBright(NoOfHealthPotion)} health potion left`)

            }

        };

        if (choices === "Run") {
            console.log(chalk.blueBright(`==============================================`))
            console.log(chalk.blueBright(`\t Thanks for playing !!!!!`));
            console.log(chalk.blueBright(`==============================================`))

            break;
        }


    }
} 

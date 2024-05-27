#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";




console.log(chalk.bold.bgCyanBright("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));

console.log(chalk.bold.greenBright("\n                                        COUNTDOWN TIMER"));

console.log(chalk.bold.bgCyanBright("\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));


const bigNumbers: string[] = [
    `
 ██████╗  
██╔═══██╗ 
██║   ██║ 
██║   ██║ 
╚██████╔╝ 
 ╚═════╝  
`,
    `
 ██╗  
 ██║  
 ██║  
 ██║  
 ██║  
 ╚═╝  
`,
    `
 ██████╗  
╚════██╗ 
 █████╔╝ 
██╔═══╝  
███████╗ 
╚══════╝ 
`,
    `
 ██████╗  
╚════██╗ 
 █████╔╝ 
 ╚═══██╗ 
██████╔╝ 
 ╚═════╝ 
`,
    `
██╗  ██╗ 
██║  ██║ 
███████║ 
╚════██║ 
     ██║ 
     ╚═╝ 
`,
    `
███████╗ 
██╔════╝ 
███████╗ 
╚════██║ 
███████║ 
╚══════╝ 
`,
    `
 ██████╗  
██╔════╝  
███████╗  
██╔═══██╗ 
╚██████╔╝ 
 ╚═════╝  
`,
    `
███████╗ 
╚════██║ 
    ██╔╝ 
   ██╔╝  
  ██╔╝   
  ╚═╝    
`,
    `
 █████╗  
██╔══██╗ 
╚█████╔╝ 
██╔══██╗ 
╚█████╔╝ 
 ╚════╝  
`,
    `
 █████╗  
██╔══██╗ 
╚██████║ 
 ╚═══██║ 
 █████╔╝ 
 ╚════╝  
`
];

const colon: string = `
     
 ██╗  
╚═╝  
 ██╗  
╚═╝  
     
`;

const timesUp: string[] = [
    `████████╗██╗███╗   ███╗███████╗    ██╗   ██╗██████╗`,
    `╚══██╔══╝██║████╗ ████║██╔════╝    ██║   ██║██╔══██╗`,
    `   ██║   ██║██╔████╔██║█████╗      ██║   ██║██████╔╝`,
    `   ██║   ██║██║╚██╔╝██║██╔══╝      ██║   ██║██╔═══╝ `,
    `   ██║   ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝██║     `,
    `   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝ ╚═╝     `
];


function getTimeInput(): Promise<{ hours: number; minutes: number; seconds: number }> {
    return inquirer.prompt([
        {
            type: "number",
            name: "hours",
            message: chalk.bold.yellowBright("Please enter the amount of hours"),
            validate: (input: any) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input < 0) {
                    return "Hours must be a non-negative number";
                } else {
                    return true;
                }
            }
        },
        {
            type: "number",
            name: "minutes",
            message: chalk.bold.yellowBright("Please enter the amount of minutes"),
            validate: (input: any) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input < 0 || input >= 61) {
                    return "Minutes must be between 0 and 60";
                } else {
                    return true;
                }
            }
        },
        {
            type: "number",
            name: "seconds",
            message: chalk.bold.yellowBright("Please enter the amount of seconds"),
            validate: (input: any) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                } else if (input < 0 || input >= 61) {
                    return "Seconds must be between 0 and 60";
                } else {
                    return true;
                }
            }
        }
    ]);
}

function printBigNumber(hours: number, minutes: number, seconds: number): void {
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Split the time string into hours, minutes, and seconds
    const [hour1, hour2, , minute1, minute2, , second1, second2] = timeString.split('');

    // Get the big number representation for each digit
    const hour1Digits = bigNumbers[parseInt(hour1)].split('\n');
    const hour2Digits = bigNumbers[parseInt(hour2)].split('\n');
    const minute1Digits = bigNumbers[parseInt(minute1)].split('\n');
    const minute2Digits = bigNumbers[parseInt(minute2)].split('\n');
    const second1Digits = bigNumbers[parseInt(second1)].split('\n');
    const second2Digits = bigNumbers[parseInt(second2)].split('\n');
    const colonDigits = colon.split('\n');

    // Print each line of the big numbers with proper alignment and colors
    for (let i = 0; i < hour1Digits.length; i++) {
        console.log(
            chalk.bold.blueBright(hour1Digits[i].padEnd(12) + hour2Digits[i].padEnd(12)) +
            chalk.bold.whiteBright(colonDigits[i].padEnd(6)) +
            chalk.bold.yellowBright(minute1Digits[i].padEnd(12) + minute2Digits[i].padEnd(12)) +
            chalk.bold.whiteBright(colonDigits[i].padEnd(6)) +
            chalk.bold.redBright(second1Digits[i].padEnd(12) + second2Digits[i])
        );
    }
}

function startTime(hours: number, minutes: number, seconds: number): void {
    function tick() {
        if (seconds === 0 && minutes === 0 && hours === 0) {
            clearInterval(timer);
            // console.clear();
            console.log(chalk.green.bold(timesUp[0]));
            console.log(chalk.yellow.bold(timesUp[1]));
            console.log(chalk.blue.bold(timesUp[2]));
            console.log(chalk.magenta.bold(timesUp[3]));
            console.log(chalk.red.bold(timesUp[4]));
            return;
        }

        if (seconds === 0) {
            seconds = 59;
            if (minutes === 0) {
                minutes = 59;
                hours--;
            } else {
                minutes--;
            }
        } else {
            seconds--;
        }

        console.clear();
        printBigNumber(hours, minutes, seconds);
    }

    const timer = setInterval(tick, 1000);
    tick(); // Initial call to print the timer immediately
}

function main(): void {
    getTimeInput()
        .then(({ hours, minutes, seconds }) => {
            startTime(hours, minutes, seconds);
        });
}

main();



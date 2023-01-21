import { program } from 'commander';

export default program
    .option('-c , --catalog')
    .option(`-p , --path <string>`, "Enter path to file or dirictory")
    .option(`-op , --out-path <string>`, "Enter out dir")
    .option(`-r , --recurcive`, "recurcive search file in subfolder ")
    .option(`-q , --quality <number>`, "Enter quality 1-100", "80")
    .option(`-l , --logging`);


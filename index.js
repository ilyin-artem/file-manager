import { createWriteStream } from 'fs';
import { EOL } from 'os';
import process from 'process';
import readline from 'readline';
import { stdin, stdout, stderr } from 'process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from './modules/args.mjs';
import { doCommand } from './modules/doCommand.mjs';

const userName = parseArgs();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileName = join(__dirname, './commands.log');
let currentDir = __dirname;

const messageHello = `Welcome to the File Manager, ${userName}!${EOL}`;
const messageBye = `Thank you for using File Manager, ${userName}!${EOL}`;

const currentDirMsg = () => {
    stdout.write(`You are currently in ${currentDir}${EOL}`);
};

stdout.write(messageHello);
currentDirMsg();

const ws = createWriteStream(fileName).on('error', (err) => console.log(err));

const rl = readline
    .createInterface({
        input: stdin,
        output: stdout,
        terminal: false,
    })
    .on('error', (err) => console.log(err));

rl.on('line', async function (line) {
    const commandArr = line.split(' ');
    const command = commandArr[0];
    const arg1 = commandArr[1];
    const arg2 = commandArr[2];
    //todo Сделать проверку на аргумент в кавычках e.g. "Programm files"
    // console.log(command);
    // console.log(commandArr.length);
    // console.log(arg1);
    // console.log(arg2);
    currentDir = await doCommand(command, currentDir, arg1, arg2);
    currentDirMsg();
    ws.write(`${line}${EOL}`);
});

process.on('SIGINT', () => {
    process.exit();
});
process.on('exit', (code) => {
    if (code === 0) {
        stdout.write(messageBye);
    } else {
        stderr.write(`Error ${code}`);
    }
});

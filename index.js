import { createWriteStream } from 'fs';
import process from 'process';
import readline from 'readline';
import { stdin, stdout, stderr } from 'process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from './modules/args.mjs';
import { list } from './modules/list.mjs';
import { up } from './modules/up.mjs';

const userName = parseArgs();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileName = join(__dirname, './commands.log');
let currentDir = __dirname;

const messageHello = `Welcome to the File Manager, ${userName}!\n`;
const messageBye = `Thank you for using File Manager, ${userName}!\n`;
let currentDirMsg = () => {
    stdout.write(`You are currently in ${currentDir} \n`);
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
    // console.log(command);
    // console.log(commandArr.length);
    // console.log(arg1);
    // console.log(arg2);
    switch (command) {
        case 'up':
            currentDir = await up(currentDir);
            console.log(currentDir);
            break;
        case 'cd':
            // todo cd
            break;
        case 'ls':
            // todo ls
            await list(currentDir);
            break;
        case 'cat':
            // todo cat
            break;
        case 'add':
            // todo add
            break;
        case 'rn':
            // todo rename
            break;
        case 'cp':
            // todo copy
            break;
        case 'mv':
            // todo mv
            break;
        case 'rm':
            // todo remove
            break;
        case 'os':
            // todo os
            // todo os --EOL Get EOL (default system End-Of-Line)
            // todo os --cpus Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
            // todo os --homedir Get home directory
            // todo os --username Get current *system user name* (Do not confuse with the username that is set when the application starts)
            // todo os --architecture Get CPU architecture for which Node.js binary has compiled
            break;
        case 'hash':
            // todo hash path_to_file Calculate hash for file and print it into console
            break;
        case 'compress':
            // todo compress path_to_file path_to_destination
            break;
        case 'decompress':
            // todo decompress path_to_file path_to_destination
            break;
        case '.exit':
            process.exit();
            break;

        default:
            console.log('Invalid input');
            break;
    }
    currentDirMsg();
    ws.write(`${line}\n`);
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

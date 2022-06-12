import process from 'process';
import { list } from './commands/list.mjs';
import { up } from './commands/up.mjs';
import { cd } from './commands/cd.mjs';
import { cat } from './commands/cat.mjs';
import { add } from './commands/add.mjs';
import { rn } from './commands/rn.mjs';
import { cp } from './commands/cp.mjs';
import { mv } from './commands/mv.mjs';
import { rm } from './commands/rm.mjs';
import { cmdOs as os } from './commands/os.mjs';
import { hash } from './commands/hash.mjs';
import { compress } from './commands/compress.mjs';
import { decompress } from './commands/decompress.mjs';

export const doCommand = async (command, currentDir, arg1, arg2) => {
    switch (command) {
        case 'up':
            currentDir = await up(currentDir);
            break;
        case 'cd':
            //todo add abosoulute path
            currentDir = await cd(currentDir, arg1);
            break;
        case 'ls':
            await list(currentDir);
            break;
        case 'cat':
            await cat(currentDir, arg1);
            break;
        case 'add':
            await add(currentDir, arg1);
            break;
        case 'rn':
            await rn(currentDir, arg1, arg2);
            break;
        case 'cp':
            await cp(currentDir, arg1, arg2);
            break;
        case 'mv':
            await mv(currentDir, arg1, arg2);
            break;
        case 'rm':
            await rm(currentDir, arg1);
            break;
        case 'os':
            await os(arg1);

            break;
        case 'hash':
            await hash(currentDir, arg1);
            break;
        case 'compress':
            await compress(currentDir, arg1, arg2);
            break;
        case 'decompress':
            await decompress(currentDir, arg1, arg2);
            break;
        case '.exit':
            process.exit();
            break;

        default:
            console.log('Invalid input');
            break;
    }
    return currentDir;
};

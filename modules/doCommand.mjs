import { list } from './commands/list.mjs';
import { up } from './commands/up.mjs';
import { cd } from './commands/cd.mjs';
import { cat } from './commands/cat.mjs';
import { add } from './commands/add.mjs';
import { rn } from './commands/rn.mjs';
import { cp } from './commands/cp.mjs';
import { mv } from './commands/mv.mjs';
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
    return currentDir;
};

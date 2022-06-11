import { argv } from 'process';
let userName;

export const parseArgs = () => {
    const userNameArg = '--username=';
    let argsArr;

    for (let i = 1; i < argv.length; i++) {
        if (argv[i].startsWith(userNameArg)) {
            argsArr = argv[i];
            break;
        }
    }

    userName = argsArr ? argsArr.slice(userNameArg.length) : 'Noname';

    return userName;
};

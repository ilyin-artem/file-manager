import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { messageFailed } from '../messages.mjs';

export const cmdOs = async (arg1) => {
    const conditionals = {
        ['--EOL']: eolConditional,
        ['--cpus']: cpusConditional,
        ['--homedir']: homedirConditional,
        ['--username']: usernameConditional,
        ['--architecture']: architectureConditional,
        Default: defaultConditional,
    };

    const conditionalFunction = conditionals[arg1] ?? conditionals.Default;
    conditionalFunction();
};

const eolConditional = async () => {
    console.log(`EOL = ${JSON.stringify(EOL)}`);
};
const cpusConditional = async () => {
    cpus().forEach((cpu, idx) => {
        for (const key in cpu) {
            console.log(cpu);
        }
    });
};
const homedirConditional = async () => {
    console.log(`Home directory: ${homedir()}`);
};
const usernameConditional = async () => {
    console.log(`User name: ${userInfo().username}`);
};
const architectureConditional = async () => {
    console.log(`CPU architecture: ${arch()}`);
};
const defaultConditional = async () => {
    messageFailed();
};

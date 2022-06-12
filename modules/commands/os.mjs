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
        console.log(
            `${idx + 1}. ${cpu.model} ${(cpu.speed / 1024).toFixed(1)}Ghz`
        );
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

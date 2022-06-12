import { readdir } from 'fs/promises';
import { messageFailed } from '../messages.mjs';

export const list = async (currentDir) => {
    try {
        const files = await readdir(currentDir);
        const filesNames = [];
        for (const file of files) filesNames.push(file);
        console.log(filesNames);
    } catch (err) {
        messageFailed();
    }
};

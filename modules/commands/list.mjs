import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'node:fs/promises';

export const list = async (currentDir) => {
    try {
        const files = await readdir(currentDir);
        const filesNames = [];
        for (const file of files) filesNames.push(file);
        console.log(filesNames);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

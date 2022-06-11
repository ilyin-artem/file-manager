import { join } from 'path';
import { access } from 'fs/promises';
import { constants } from 'node:fs';
import { messageFailed } from '../messages.mjs';

const checkFileExists = async (file) => {
    return await access(file, constants.F_OK)
        .then(() => true)
        .catch(() => false);
};

export const cd = async (currentDir, path) => {
    const newPath = join(currentDir, path);
    if (await checkFileExists(newPath)) return newPath;
    messageFailed();
    return currentDir;
};

import { join } from 'path';
import { messageFailed } from '../messages.mjs';
import { checkFileExists } from '../checkFileExists.mjs';

export const cd = async (currentDir, path) => {
    const newPath =
        (await checkFileExists(path)) && path !== '..' && path !== '.'
            ? path
            : join(currentDir, path);

    if (await checkFileExists(newPath)) return newPath;
    messageFailed();
    return currentDir;
};

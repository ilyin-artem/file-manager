import { access } from 'fs/promises';
import { constants } from 'node:fs';

export const checkFileExists = async (file) => {
    return await access(file, constants.F_OK)
        .then(() => true)
        .catch(() => false);
};

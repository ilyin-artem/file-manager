import { rename } from 'fs/promises';
import { join, dirname } from 'path';
import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed, messageFileSuccess } from '../messages.mjs';

export const rn = async (currentDir, fileSource, fileTarget) => {
    if (await checkFileExists(fileSource)) {
        fileTarget = join(dirname(fileSource), fileTarget);
        renameFile(fileSource, fileTarget);
    } else {
        fileSource = join(currentDir, fileSource);
        await renameFile(fileSource, fileTarget);
    }
};

const renameFile = async (fileSource, fileTarget) => {
    try {
        if (
            (await checkFileExists(fileSource)) &&
            !(await checkFileExists(fileTarget))
        ) {
            await rename(fileSource, fileTarget);
            messageFileSuccess('renamed', fileSource);
        } else {
            messageFailed();
        }
    } catch (error) {
        messageFailed();
    }
};

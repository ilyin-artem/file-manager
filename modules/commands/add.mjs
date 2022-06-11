import { join } from 'path';
import { writeFile } from 'fs/promises';
import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed, messageFileCreated } from '../messages.mjs';

export const add = async (currentDir, file) => {
    const FileName = join(currentDir, file);
    await createFile(FileName);
};

const createFile = async (file) => {
    try {
        if (!(await checkFileExists(file))) {
            await writeFile(file, '', 'utf8');
            messageFileCreated(file);
        } else {
            messageFailed();
        }
    } catch (error) {
        messageFailed();
    }
};

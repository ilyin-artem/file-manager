import { join } from 'path';
import { readFile } from 'fs/promises';
import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed } from '../messages.mjs';

export const cat = async (currentDir, file) => {
    const FileName = (await checkFileExists(file))
        ? file
        : join(currentDir, file);
    await catFile(FileName);
};

const catFile = async (file) => {
    try {
        if (await checkFileExists(file)) {
            let data;
            data = await readFile(file);

            console.log(data.toString());
        } else {
            messageFailed();
        }
    } catch (error) {
        messageFailed();
    }
};

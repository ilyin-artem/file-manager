import { join } from 'path';
import { createWriteStream } from 'fs';
import { messageFailed, messageFileSuccess } from '../messages.mjs';
import { stdin } from 'process';

export const add = async (currentDir, file) => {
    const FileName = join(currentDir, file);
    await createFile(FileName);
};

const createFile = async (file) => {
    try {
        const writingStream = createWriteStream(file);

        messageFileSuccess('created', file);
    } catch (error) {
        messageFailed();
    }
};

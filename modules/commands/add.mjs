import { join } from 'path';
import { createWriteStream } from 'fs';
// import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed, messageFileCreated } from '../messages.mjs';
import { stdin } from 'process';

export const add = async (currentDir, file) => {
    const FileName = join(currentDir, file);
    await createFile(FileName);
};

const createFile = async (file) => {
    try {
        const writingStream = createWriteStream(file, { flags: 'a' });
        stdin.on('data', (chunk) => {
            writingStream.write(chunk);
        });
        messageFileCreated(file);
    } catch (error) {
        messageFailed();
        пш;
    }
};

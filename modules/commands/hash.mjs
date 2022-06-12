import { join, isAbsolute } from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { messageFailed } from '../messages.mjs';
import { isDirectory } from '../isDirectory.mjs';

export const hash = async (currentDir, file) => {
    const FileName = (await isAbsolute(file)) ? file : join(currentDir, file);
    if (await isDirectory(FileName)) {
        messageFailed();
        return;
    }
    await calculateHash(FileName);
};

export const calculateHash = async (fileSource) => {
    const hash = createHash('sha256');

    const readingStream = createReadStream(fileSource);
    readingStream.on('readable', () => {
        const data = readingStream.read();
        if (data) hash.update(data);
        else {
            console.log(hash.digest('hex'));
        }
    });
};

import { join, isAbsolute } from 'path';
import { createReadStream } from 'fs';
import { messageFailed } from '../messages.mjs';
import { isDirectory } from '../isDirectory.mjs';

export const cat = async (currentDir, file) => {
    const FileName = (await isAbsolute(file)) ? file : join(currentDir, file);
    if (await isDirectory(FileName)) {
        messageFailed();
        return;
    }
    await catFile(FileName);
};

const catFile = async (file) => {
    const stream = createReadStream(file, 'utf-8');
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => process.stdout.write(data + '\n'));
    stream.on('error', (error) => messageFailed());
};

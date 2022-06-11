import { join } from 'path';
import { createReadStream } from 'fs';
import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed } from '../messages.mjs';

export const cat = async (currentDir, file) => {
    const FileName = (await checkFileExists(file))
        ? file
        : join(currentDir, file);
    await catFile(FileName);
};

const catFile = async (file) => {
    const stream = createReadStream(file, 'utf-8');
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => process.stdout.write(data + '\n'));
    stream.on('error', (error) => messageFailed());
};

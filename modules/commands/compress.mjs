import { createReadStream, createWriteStream } from 'fs';
import { join, dirname, isAbsolute, parse } from 'path';
import { checkFileExists } from '../checkFileExists.mjs';
import { createGzip } from 'zlib';
import { messageFailed, messageFileSuccess } from '../messages.mjs';
import { isDirectory } from '../isDirectory.mjs';

export const compress = async (
    currentDir,
    fileSource,
    fileTarget = currentDir
) => {
    if (
        !(await checkFileExists(fileSource)) ||
        (await isDirectory(fileSource)) ||
        !(await checkFileExists(fileTarget))
    ) {
        messageFailed();
        return;
    }
    if (await isAbsolute(fileSource)) {
        fileTarget = join(dirname(fileSource), fileTarget);
    } else {
        fileSource = join(currentDir, fileSource);
    }

    await compressGzip(fileSource, fileTarget);
};

const compressGzip = async (fileSource, fileTarget) => {
    const inputFilePath = join(fileSource);
    const outputFilePath = join(fileTarget, parse(fileSource).base + '.gz');

    const readable = createReadStream(inputFilePath);
    const writable = createWriteStream(outputFilePath);
    try {
        if (!(await isDirectory(fileTarget))) throw 'Dest not directory';
        await readable.pipe(createGzip()).pipe(writable);
        messageFileSuccess('compressed', outputFilePath);
    } catch (error) {
        messageFailed();
    }
};

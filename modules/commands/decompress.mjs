import { createReadStream, createWriteStream } from 'fs';
import { join, dirname, isAbsolute, parse } from 'path';
import { checkFileExists } from '../checkFileExists.mjs';
import { createBrotliDecompress } from 'zlib';
import { messageFailed, messageFileSuccess } from '../messages.mjs';
import { isDirectory } from '../isDirectory.mjs';

export const decompress = async (
    currentDir,
    fileSource,
    fileTarget = currentDir
) => {
    if (await isAbsolute(fileSource)) {
        fileTarget = join(dirname(fileSource), fileTarget);
    } else {
        fileSource = join(currentDir, fileSource);
    }

    if (
        !(await checkFileExists(fileSource)) ||
        (await isDirectory(fileSource)) ||
        !(await checkFileExists(fileTarget))
    ) {
        messageFailed();
        return;
    }

    await decompressBrotli(fileSource, fileTarget);
};

const decompressBrotli = async (fileSource, fileTarget) => {
    const inputFilePath = join(fileSource);
    const outputFilePath = join(fileTarget, parse(fileSource).name);

    const readable = createReadStream(inputFilePath);
    const writable = createWriteStream(outputFilePath);

    try {
        if (!(await isDirectory(fileTarget))) throw 'Dest not directory';
        await readable.pipe(createBrotliDecompress()).pipe(writable);
        messageFileSuccess('decompressed', outputFilePath);
    } catch (error) {
        messageFailed();
    }
};

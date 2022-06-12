import { readdir, mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { join, isAbsolute, dirname, basename } from 'path';

import { isDirectory } from '../isDirectory.mjs';
import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed, messageFileSuccess } from '../messages.mjs';

export const cp = async (currentDir, fileSource, fileTarget) => {
    if (!(await isAbsolute(fileSource)))
        fileSource = join(currentDir, fileSource);

    if (!(await isAbsolute(fileTarget)))
        fileTarget = join(dirname(fileSource), fileTarget);

    if (!(await checkFileExists(fileSource))) {
        messageFailed();
        return;
    }

    await copyFiles(fileSource, fileTarget);
};

const copyFiles = async (folderSource, folderTarget) => {
    let sourceFile;
    let targetFile;

    try {
        if (await isDirectory(folderSource)) {
            if (!(await checkFileExists(folderTarget)))
                await mkdir(folderTarget);
            const data = await readdir(folderSource);

            for (const file of data) {
                sourceFile = join(folderSource, file);
                targetFile = join(folderTarget, file);
                if (await checkFileExists(targetFile)) throw 'File exists';
                // copyFile(sourceFile, targetFile);

                createReadStream(sourceFile).pipe(
                    createWriteStream(targetFile)
                );
                messageFileSuccess('copied', targetFile);
            }
        } else {
            // if file
            if (await isDirectory(folderTarget)) {
                targetFile = join(folderTarget, basename(folderSource));
                // copyFile(folderSource, targetFile);
                if (await checkFileExists(targetFile)) throw 'File exists';
                await createReadStream(folderSource).pipe(
                    createWriteStream(targetFile)
                );
                messageFileSuccess('copied', targetFile);
            } else {
                messageFailed();
            }
        }
    } catch (error) {
        messageFailed();
    }
};

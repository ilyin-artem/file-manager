import { rm as remove } from 'fs/promises';
import { join, isAbsolute } from 'path';
import { isDirectory } from '../isDirectory.mjs';
import { checkFileExists } from '../checkFileExists.mjs';
import { messageFailed, messageFileSuccess } from '../messages.mjs';

export const rm = async (currentDir, fileSource) => {
    if (!(await isAbsolute(fileSource)))
        fileSource = join(currentDir, fileSource);

    if (!(await checkFileExists(fileSource))) {
        messageFailed();
        return;
    }

    await deleteFile(fileSource);
};

const deleteFile = async (folderSource) => {
    try {
        if (await isDirectory(folderSource))
            throw 'The folder cannot be deleted';
        // if (await isDirectory(folderSource)) {
        //     const data = await readdir(folderSource);
        //     for (const file of data) {
        //         sourceFile = join(folderSource, file);
        //         await unlink(sourceFile);
        //         messageFileSuccess('moved', sourceFile);
        //     }
        else {
            // if file

            await remove(folderSource);
            messageFileSuccess('removed', folderSource);
        }
    } catch (error) {
        messageFailed();
    }
};

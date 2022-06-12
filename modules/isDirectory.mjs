import { lstat } from 'fs/promises';
export const isDirectory = async (file) => {
    const stat = await lstat(file);
    return stat.isDirectory();
};

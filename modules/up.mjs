import { join } from 'path';

export const up = async (currentDir) => {
    return join(currentDir, '../');
};

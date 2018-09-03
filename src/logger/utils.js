import path from 'path';
import packageInfo from '../../package.json';

const PROJECT_DIR = path.resolve(__dirname, '..');

export const createPrefix = function(filename) {
    let prefix = packageInfo.name;
    let pathDesc = path.relative(PROJECT_DIR, filename)
        .replace('/', '.')
        .replace(/(?:index)?\.js$/, '')
    ;
    prefix += `:${pathDesc}`;
    return prefix
        .replace(/[^a-z0-9\\.:]/ig, '')
        .replace(/[.]{2,}/g, '.')
        .replace(/[.]$/, '')
    ;
};

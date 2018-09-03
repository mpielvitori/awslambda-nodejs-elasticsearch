
import etc from 'etc';
import etcYml from 'etc-yaml';
import packageInfo from '../../package.json';
import createDebug from '../logger/debug';
import envConfig from './env';

const debug = createDebug(__filename);

const prefix = packageInfo.name.replace(/\./g, '_') + '_';

debug(`Load config, env prefix is ${prefix}`);
const config = etc()
    .use(etcYml)
    .add(envConfig)
    .env(prefix, '_')
    .pkg()
;

export default config;

debug(`Config is`, config.toJSON());

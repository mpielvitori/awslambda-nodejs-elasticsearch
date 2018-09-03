import {
  createLogger,
  transports,
  format,
} from 'winston';
import config from '../config';
import {createPrefix} from './utils';
import createDebug from './debug';

const debug = createDebug(__filename);

const COLORS = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red',
};

const parseFileName = function(pattern, options = {}) {
    return Object.keys(options).reduce((pattern, k) => {
        return pattern.replace(`%${k}`, options[k]);
    }, pattern);
};

/**
 * Create new logger
 * @param {string} filename The prefix
 * @param {object} [options] Options for winston
 * @return {winston} Logger object
 */
export default function logger(filename, options = []) {
    const prefix = createPrefix(filename);

    debug(`start new logger with prefix ${prefix}`);

    const myFormat = format.printf((info) => {
        return `${info.timestamp} [${info.label||''}] ${info.level}: ` +
                                                                info.message;
    });

    const LOGGING_LEVEL = config.get('logging:level') || 'info';
    const LOGGING_COLORS = config.get('logging:colors') || false;
    const LOGGING_CLI = config.get('logging:cli') || false;
    const LOGGING_CLI_LEVEL = typeof LOGGING_CLI === 'string' ?
                                                    LOGGING_CLI : LOGGING_LEVEL;
    const LOGGING_FILE = config.get('logging:file') || false;

    const loggerConfig = {
        transports: [],
    };

    if (LOGGING_CLI) {
        debug(
            `Logging cli is enabled as ${LOGGING_CLI} (${LOGGING_CLI_LEVEL})`);
        loggerConfig.transports.push(new(transports.Console)({
            level: LOGGING_CLI_LEVEL,
            colorize: !!LOGGING_COLORS,
            timestamp: true,
            format: format.combine(
                format.label({label: prefix}),
                format.timestamp(),
                format.colorize(),
                myFormat
            ),
            colors: COLORS,
        }));
    }

    if (LOGGING_FILE) {
        debug(`Logging file is enabled as ${LOGGING_FILE}`);
        loggerConfig.transports.push(new(transports.File)({
            level: LOGGING_LEVEL,
            filename: parseFileName(LOGGING_FILE, {prefix}),
            maxsize: 20971520,
            timestamp: true,
            tailable: true,
            json: false,
        }));
    }

    return createLogger({
        ...options,
        ...loggerConfig,
    });

}

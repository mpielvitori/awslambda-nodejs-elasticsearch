
import {
    createLogger,
    transports,
    format,
  } from 'winston';

const {combine, timestamp, label, printf} = format;

const myFormat = printf((info) => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        label({label: 'mutants'}),
        timestamp(),
        myFormat
    ),
    transports: [new transports.Console()],
});

export default logger;

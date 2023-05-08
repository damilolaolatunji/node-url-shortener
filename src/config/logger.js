import winston from 'winston';
import { WinstonTransport } from '@appsignal/nodejs';
import config from './config.js';

const { combine, timestamp, json, errors } = winston.format;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = winston.createLogger({
  levels: logLevels,
  level: config.logLevel,
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new WinstonTransport({ group: 'abridge_url' }),
  ],
});

export default logger;

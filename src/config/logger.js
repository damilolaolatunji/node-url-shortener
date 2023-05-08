import pino from 'pino';
import config from './config.js';

const logger = pino({
  level: config.logLevel,
  formatters: {
    bindings: (bindings) => {
      return { pid: bindings.pid, host: bindings.hostname };
    },

    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;

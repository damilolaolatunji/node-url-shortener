import logger from '../config/logger.js';
import morgan from 'morgan';

const requestLogger = morgan(function (tokens, req, res) {
  const msg = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');

  logger.info(msg.trim(), {
    method: tokens.method(req, res),
    path: tokens.url(req, res),
    status_code: Number(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    response_time_ms: tokens['response-time'](req, res),
    user_agent: tokens['user-agent'](req, res),
  });
});

export default requestLogger;

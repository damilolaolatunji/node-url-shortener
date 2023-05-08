import { ValidationError } from 'express-json-validator-middleware';
import logger from '../config/logger.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof ValidationError) {
    statusCode = 400;
    message = 'validation error';
    logger.info(err);
  } else {
    logger.error(err);
  }

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
};

export default errorHandler;

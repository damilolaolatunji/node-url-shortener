import './appsignal.js';
import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import logger from './config/logger.js';

function exit() {
  if (app.server) {
    app.server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function handleError(error) {
  logger.fatal(error);
  exit();
}

try {
  await mongoose.connect(config.mongoose.url);

  logger.info('Connected to MongoDB');

  const address = await app.listen({ port: config.port });
  logger.info(
    `URL Shortener is running in ${config.env} mode → PORT ${address}`
  );

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Executing shutdown sequence');
    exit();
  });

  process.on('uncaughtException', handleError);
  process.on('unhandledRejection', handleError);
} catch (err) {
  logger.fatal(err);
  exit();
}

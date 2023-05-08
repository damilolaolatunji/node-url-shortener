import path from 'node:path';
import * as url from 'node:url';
import envSchema from 'env-schema';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const schema = {
  type: 'object',
  required: ['PORT', 'LOG_LEVEL', 'NODE_ENV', 'MONGODB_URL'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    LOG_LEVEL: {
      type: 'string',
      default: 'info',
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
      enum: ['development', 'testing', 'production', 'staging'],
    },
    MONGODB_URL: {
      type: 'string',
    },
    APPSIGNAL_PUSH_API_KEY: {
      type: 'string',
    },
  },
};

const config = envSchema({
  schema: schema,
  dotenv: {
    path: path.join(__dirname, '../../.env'),
  },
});

export default {
  port: config.PORT,
  logLevel: config.LOG_LEVEL,
  env: config.NODE_ENV,
  appsignalPushApiKey: config.APPSIGNAL_PUSH_API_KEY,
  mongoose: {
    url: config.MONGODB_URL,
  },
};

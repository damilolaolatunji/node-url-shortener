import Fastify from 'fastify';

import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyCompress from '@fastify/compress';
import path from 'node:path';
import * as url from 'node:url';
import routes from './routes/routes.js';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import pug from 'pug';
import logger from './config/logger.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const fastifyApp = Fastify({
  logger: logger,
});

await fastifyApp.register(fastifyCors);
await fastifyApp.register(fastifyHelmet);
await fastifyApp.register(fastifyCompress);
await fastifyApp.register(fastifyView, {
  engine: {
    pug,
  },
  root: path.join(__dirname, 'views'),
  propertyName: 'render',
  viewExt: 'pug',
});
await fastifyApp.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/static/',
});
await fastifyApp.register(routes);

export default fastifyApp;

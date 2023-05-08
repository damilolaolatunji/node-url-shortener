import urlSchema from '../schemas/url.schema.js';
import urlController from '../controllers/url.controller.js';
import rootController from '../controllers/root.controller.js';
import errorHandler from '../middleware/error.js';

export default async function fastifyRoutes(fastify) {
  fastify.get('/', rootController.render);

  fastify.post(
    '/shorten',
    {
      schema: {
        body: urlSchema,
      },
    },
    urlController.shorten
  );

  fastify.get('/:shortID', urlController.redirect);

  fastify.setErrorHandler(errorHandler);
}

import express from 'express';
import validate from '../middleware/validator.js';
import urlSchema from '../schemas/url.schema.js';
import urlController from '../controllers/url.controller.js';
import rootController from '../controllers/root.controller.js';

const router = express.Router();

router.get('/', rootController.render);
router.post('/shorten', validate({ body: urlSchema }), urlController.shorten);
router.get('/:shortID', urlController.redirect);

export default router;

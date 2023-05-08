import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import path from 'node:path';
import * as url from 'node:url';
import routes from './routes/routes.js';

import requestLogger from './middleware/requestLogger.js';
import 'express-async-errors';
import { expressErrorHandler } from '@appsignal/nodejs';
import errorHandler from './middleware/error.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const expressApp = express();

expressApp.set('view engine', 'pug');
expressApp.set('views', path.join(__dirname, 'views'));

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use('/static', express.static(path.join(__dirname, 'public')));

expressApp.use(helmet());
expressApp.use(cors());
expressApp.use(compression());

// Log all incoming requests
expressApp.use(requestLogger);

// setup routes
expressApp.use(routes);

// Handle errors
expressApp.use(expressErrorHandler());
expressApp.use(errorHandler);

export default expressApp;

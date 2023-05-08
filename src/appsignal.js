import config from './config/config.js';
import { Appsignal } from '@appsignal/nodejs';

new Appsignal({
  active: true,
  name: 'Abridge URL',
  pushApiKey: config.appsignalPushApiKey,
});

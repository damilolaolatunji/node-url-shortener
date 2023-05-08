import Url from '../models/url.model.js';
import logger from '../config/logger.js';

async function shorten(req, res) {
  const { shortID, destination } = await Url.findOrCreate(req.body.destination);

  logger.debug(`${destination} shortened to ${shortID}`);

  res.send({ shortID, destination });
}

async function redirect(req, res) {
  const { shortID } = req.params;

  const { destination } = await Url.findOne({ shortID });

  logger.debug(`redirecting /${shortID} to ${destination}`);

  res.redirect(destination);
}

export default { shorten, redirect };

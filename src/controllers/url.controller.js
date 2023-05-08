import Url from '../models/url.model.js';

async function shorten(req, reply) {
  const { shortID, destination } = await Url.findOrCreate(req.body.destination);

  req.log.debug(`${destination} shortened to ${shortID}`);

  reply.send({ shortID, destination });
}

async function redirect(req, reply) {
  const { shortID } = req.params;

  const { destination } = await Url.findOne({ shortID });

  req.log.debug(`redirecting /${shortID} to ${destination}`);

  reply.redirect(destination);
}

export default { shorten, redirect };

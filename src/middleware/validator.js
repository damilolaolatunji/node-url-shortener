import { Validator } from 'express-json-validator-middleware';
import addFormats from 'ajv-formats';

const validator = new Validator();
addFormats(validator.ajv);

export default validator.validate;

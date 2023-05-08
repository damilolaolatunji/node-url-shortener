const urlSchema = {
  type: 'object',
  required: ['destination'],
  properties: {
    destination: {
      type: 'string',
      format: 'uri',
    },
  },
};

export default urlSchema;

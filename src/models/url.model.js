import mongoose from 'mongoose';
import nanoid from 'nanoid';
import toJSON from './plugins/toJSON.plugin.js';

const urlSchema = mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    shortID: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

urlSchema.plugin(toJSON);

urlSchema.statics.findOrCreate = async function (destination) {
  const url = await this.findOne({ destination });

  if (url) return url;

  return await this.create({ destination });
};

urlSchema.pre('save', function (next) {
  this.shortID = nanoid(7);
  next();
});

const Url = mongoose.model('Url', urlSchema);

export default Url;

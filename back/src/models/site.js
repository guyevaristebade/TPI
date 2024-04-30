import mongoose from 'mongoose';

const siteSchema = mongoose.Schema({
  site_name : {
    type: String,
    required: true,
  },
  address : {
    type: String,
    required: true,
  }
});

export const siteModel = mongoose.model('site',siteSchema);

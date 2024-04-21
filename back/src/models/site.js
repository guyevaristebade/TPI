import mongoose from 'mongoose';

const siteSchema = mongoose.Schema({
  site_name : {
    type: String,
    required: true,
    unique: true
  },
  address : {
    type: String,
    required: true,
    unique: true
  }
});

export const siteModel = mongoose.model('Site',siteSchema);

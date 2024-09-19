import mongoose from 'mongoose';

const siteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  manager: {
    type: String,
    required: true,
    trim: true
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }],
},{
  timestamps : true
});

export const Site = mongoose.model('Site',siteSchema);

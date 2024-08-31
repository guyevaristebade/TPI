import mongoose from 'mongoose';

const siteDeviceMappingSchema = mongoose.Schema({
  site_id: {
    type: mongoose.Types.ObjectId,
    ref: 'site'
  },
  device_id: {
    type: mongoose.Types.ObjectId,
    ref: 'device'
  },
  state: {
    type: String
  },
}, {
  timestamps: true
});

export const SiteDeviceMapping = mongoose.model('SiteDeviceMapping', siteDeviceMappingSchema);

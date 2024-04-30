import mongoose from 'mongoose';

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  device: {
    type: mongoose.Types.ObjectId,
    ref: 'device',
    required: true
  }
});

export const fileModel = mongoose.model('file', fileSchema);

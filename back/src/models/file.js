import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  filename: String,
  createdAt: { type: Date, default: Date.now }
});

export const Image = mongoose.model('Image', imageSchema);

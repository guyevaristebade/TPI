import mongoose from "mongoose";


const historySchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  action: {
    type: String,
    enum: ['Attribué', 'Désattribué'],
    required: true
  },
  /*performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },*/
},{
    timestamps: true
});

export const History = mongoose.model('History', historySchema);

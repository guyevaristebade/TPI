import mongoose from "mongoose";


const assignmentSchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  }
},{
    timestamps: true
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);

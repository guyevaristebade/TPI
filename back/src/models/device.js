import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
  line :{
    type: String,
    required: true,
    unique: true
  },
  brand :{
    type: String,
    required: true,
  },
  date :{
    type: Date,
    required: true,
  },
  site_id :{
    type: mongoose.Types.ObjectId,
    ref: 'site'
  },
  state : {
    type: String,
    required: true
  }
})

export const deviceModel = mongoose.model('device',deviceSchema);

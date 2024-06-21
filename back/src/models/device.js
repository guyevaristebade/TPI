import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
  line :{
    type: String,
    required: true,
    unique: true,
    match : [/^\+33\d{9,10}$/, "Veuillez entrez un numéro de téléphone "]
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
},{
  timestamps : true
})

export const deviceModel = mongoose.model('device',deviceSchema);

import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
  line: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+33\d{9,10}$/, "Veuillez entrer un numéro de téléphone valide"]
  },
  brand: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ['Hors service', 'En service'],
    default: 'Hors service'
  },
  imei: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{14,16}$/, "Veuillez entrer un numéro IMEI valide de 14 à 16 chiffres"]
  }
}, {
  timestamps: true
});

export const deviceModel = mongoose.model('device', deviceSchema);

import mongoose from 'mongoose';

const deviceSchema = mongoose.Schema({
  line: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{9,10}$/, "Veuillez entrer un numéro de téléphone valide"]
  },
  imei: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{14,16}$/, "Veuillez entrer un numéro IMEI valide de 14 à 16 chiffres"]
  },
  brand: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['Disponible', 'Assigné', 'En maintenance'],
    default: 'Disponible'
  }
}, {
  timestamps: true
});

export const Device = mongoose.model('Device', deviceSchema);

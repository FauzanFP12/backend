import mongoose from 'mongoose';

const insidenSchema = new mongoose.Schema({
  idInsiden: { type: String, required: true },
  deskripsi: { type: String, required: true },
  status: { type: String, required: true },
  tanggalStart: { type: Date, required: true }, // Tanggal mulai insiden yang diinput user
  tanggalSubmit: { type: Date, default: Date.now }, // Tanggal saat insiden disubmit
  durasi: { type: Number },
  sbu: { type: String },
  backbone: { type: String },
  superbackbone: { type: String },
  distribusi: { type: String },
  access: { type: String },
  pilihan: { type: String },
});

// Model Insiden
const Insiden = mongoose.model('Insiden', insidenSchema);

export default Insiden;

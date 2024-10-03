import mongoose from 'mongoose';

const insidenSchema = new mongoose.Schema({
  idInsiden: { type: String, required: true },
  deskripsi: { type: String, required: true },
  status: { type: String, required: true },
  tanggalStart: { type: Date, default: Date.now },
  tanggalSubmit: { type: Date, required: true },
  durasi: { type: Number },
  sbu: { type: String },
  backbone: { type: String },
  superbackbone: { type: String },
  distribusi: { type: String },
  access: { type: String },
  pilihan: { type: String },
});

const Insiden = mongoose.model('Insiden', insidenSchema);

export default Insiden;

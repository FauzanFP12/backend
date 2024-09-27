// models/Insiden.js
const mongoose = require('mongoose');

const insidenSchema = new mongoose.Schema({
  deskripsi: { type: String, required: true },
  status: { type: String, required: true },
  tanggalStart: { type: Date, default: Date.now },
  durasi: { type: Number },
  sbu: { type: String },
  backbone: { type: String },
  superbackbone: { type: String },
  distribusi: { type: String },
  access: { type: String },
  pilihan: { type: String },
});

const Insiden = mongoose.model('Insiden', insidenSchema);

module.exports = Insiden;

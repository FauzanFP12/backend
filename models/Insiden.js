import mongoose from 'mongoose';

const insidenSchema = new mongoose.Schema({
  idInsiden: { type: String, required: true },
  deskripsi: { type: String, required: true },
  status: { type: String, required: true },
  tanggalStart: { 
    type: Date, 
    default: function() {
      const now = new Date();  // Current time in UTC
      return new Date(now.getTime() + 7 * 60 * 60 * 1000 - 25197 * 1000); 
    }
  },
  elapsedTime: { type: Number, default: 0 }, 
  closeTime: { type: Date },  // Last time the incident was closed
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

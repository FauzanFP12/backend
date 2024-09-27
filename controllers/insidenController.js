// controllers/insidenController.js
const Insiden = require('../models/Insiden');

// GET all incidents
const getInsidens = async (req, res) => {
  try {
    const insidens = await Insiden.find({});
    res.json(insidens);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching incidents' });
  }
};

// POST a new incident
const createInsiden = async (req, res) => {
  const { deskripsi, status, durasi, sbu, backbone, superbackbone, distribusi, access, pilihan } = req.body;

  const newInsiden = new Insiden({
    deskripsi,
    status,
    durasi,
    sbu,
    backbone,
    superbackbone,
    distribusi,
    access,
    pilihan,
  });

  try {
    const savedInsiden = await newInsiden.save();
    res.status(201).json(savedInsiden);
  } catch (err) {
    res.status(500).json({ message: 'Error creating incident' });
  }
};

// UPDATE an incident
const updateInsiden = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedInsiden = await Insiden.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedInsiden);
  } catch (err) {
    res.status(500).json({ message: 'Error updating incident' });
  }
};

// DELETE an incident
const deleteInsiden = async (req, res) => {
  const { id } = req.params;

  try {
    await Insiden.findByIdAndDelete(id);
    res.json({ message: 'Incident deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting incident' });
  }
};

module.exports = { getInsidens, createInsiden, updateInsiden, deleteInsiden };
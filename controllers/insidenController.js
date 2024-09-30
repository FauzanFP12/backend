import Insiden from '../models/Insiden.js';

// GET all incidents
export const getInsidens = async (req, res) => {
  try {
    const insidens = await Insiden.find({});
    res.json(insidens);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching incidents' });
  }
};

// POST a new incident
export const createInsiden = async (req, res) => {
  console.log('Incoming POST request:', req.body); // Debugging line

  const { idInsiden, deskripsi, status, durasi, sbu, backbone, superbackbone, distribusi, access, pilihan } = req.body;

  const newInsiden = new Insiden({
    idInsiden,
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
    res.status(201).json(savedInsiden); // Send back the created incident
  } catch (err) {
    res.status(500).json({ message: 'Error creating incident', error: err.message });
  }
};

// UPDATE an incident
export const updateInsiden = async (req, res) => {
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
export const deleteInsiden = async (req, res) => {
  const { id } = req.params;

  try {
    await Insiden.findByIdAndDelete(id);
    res.json({ message: 'Incident deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting incident' });
  }
};

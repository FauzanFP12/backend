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

  const { idInsiden, deskripsi, status, tanggalStart, tanggalSubmit, sbu, backbone, superbackbone, distribusi, access, pilihan } = req.body;

  
  const newInsiden = new Insiden({
    idInsiden,
    deskripsi,
    status,
    tanggalStart,  // Save adjusted GMT+7 time
    tanggalSubmit,
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

// CLOSE an incident and calculate elapsed time
export const closeInsiden = async (req, res) => {
  const { id } = req.params;

  try {
    const insiden = await Insiden.findById(id);

    if (!insiden) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Calculate the elapsed time
    const currentTime = new Date();
    const elapsedTime = currentTime - new Date(insiden.tanggalStart);

    // Update the incident status, elapsed time, and close time
    insiden.status = 'Closed';
    insiden.elapsedTime = (insiden.elapsedTime || 0) + elapsedTime;  // Accumulate previous elapsed time
    insiden.closeTime = currentTime;

    await insiden.save();
    res.json(insiden);
  } catch (err) {
    res.status(500).json({ message: 'Error closing incident', error: err.message });
  }
};

// REOPEN an incident and retain previous elapsed time
export const reopenInsiden = async (req, res) => {
  const { id } = req.params;

  try {
    const insiden = await Insiden.findById(id);

    if (!insiden) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Reopen the incident, reset the close time
    insiden.status = 'Open';
    insiden.closeTime = null;  // Reset close time

    await insiden.save();
    res.json(insiden);
  } catch (err) {
    res.status(500).json({ message: 'Error reopening incident', error: err.message });
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

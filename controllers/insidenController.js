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

  const addGMT7 = (date) => {
    const gmt7Offset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
    return new Date(date.getTime() + gmt7Offset);
};
  const currentDate = new Date(); // Get current date and time
  const gmt7Date = addGMT7(currentDate); // Adjust to GMT+7
  elapsedTime = gmt7Date - startDate; // Time running until now
  // Validate tanggalStart to ensure it is not in the future
  const now = new Date();
  if (new Date(tanggalStart) > now) {
    return res.status(400).json({ message: 'Tanggal Start cannot be in the future' });
  }

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
    elapsedTime,  // Start with 0 elapsed time
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

// CLOSE an incident and stop elapsed time
export const closeInsiden = async (req, res) => {
  const { id } = req.params;

  try {
    const insiden = await Insiden.findById(id);

    if (!insiden) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    const currentTime = new Date();
    const elapsedMilliseconds = currentTime - new Date(insiden.tanggalStart);  // Total time since start
    const updatedElapsedTime = insiden.elapsedTime + elapsedMilliseconds;  // Accumulate previous elapsed time

    // Update the incident's status and elapsed time
    insiden.status = 'Closed';
    insiden.elapsedTime = updatedElapsedTime;  // Store the accumulated time
    insiden.closeTime = currentTime;  // Store the time of closure

    await insiden.save();
    res.json(insiden);
  } catch (err) {
    res.status(500).json({ message: 'Error closing incident', error: err.message });
  }
};

// REOPEN an incident and continue tracking elapsed time
export const reopenInsiden = async (req, res) => {
  const { id } = req.params;

  try {
    const insiden = await Insiden.findById(id);

    if (!insiden) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Ensure tanggalStart is not set in the future
    const now = new Date();
    if (insiden.tanggalStart > now) {
      return res.status(400).json({ message: 'Tanggal Start cannot be in the future' });
    }

    // Reset the close time and set status to Open
    insiden.status = 'Open';
    insiden.tanggalStart = new Date();  // Set a new start time to continue tracking from now
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

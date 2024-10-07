import Insiden from '../models/Insiden.js';

// Helper function to add hours and subtract 25197 seconds from a date
const adjustDate = (date) => {
  const now = new Date(date);
  return new Date(now.getTime() + 7 * 60 * 60 * 1000 - 25197 * 1000);
};


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

  const now = new Date();

  // Adjust tanggalStart by adding 7 hours and subtracting 25197 seconds
  const adjustedStartDate = adjustDate(new Date(tanggalSubmit));
  const submitDate = new Date(tanggalStart);

  if (submitDate > now) {
    return res.status(400).json({ message: 'Tanggal Submit cannot be in the future' });
  }

  if (adjustedStartDate > now) {
    return res.status(400).json({ message: 'Tanggal Start cannot be in the future' });
  }

  // Initialize elapsed time to 0 by default
  let elapsedTime = 0;

  // If the status is "Closed", calculate the elapsed time between start and submit date
  if (status === 'Closed') {
    const elapsedMilliseconds = submitDate - adjustedStartDate;
    elapsedTime = elapsedMilliseconds > 0 ? elapsedMilliseconds : 0;  // Ensure non-negative elapsed time
  }

  // Prepare the new incident object
  const newInsiden = new Insiden({
    idInsiden,
    deskripsi,
    status,
    tanggalStart: adjustedStartDate,  // Use adjusted start date
    tanggalSubmit,
    sbu,
    backbone,
    superbackbone,
    distribusi,
    access,
    pilihan,
    elapsedTime,  // Save the calculated elapsed time
  });

  try {
    // Save the new incident
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
    const elapsedMilliseconds = currentTime - new Date(insiden.tanggalSubmit);  // Total time since start
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
    if (insiden.tanggalSubmit > now) {
      return res.status(400).json({ message: 'Tanggal Start cannot be in the future' });
    }

    // Reset the close time and set status to Open
    insiden.status = 'Open';
    insiden.tanggalSubmit = new Date();  // Set a new start time to continue tracking from now
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

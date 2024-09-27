// routes/insidenRoutes.js
const express = require('express');
const {
  getInsidens,
  createInsiden,
  updateInsiden,
  deleteInsiden
} = require('../controllers/insidenController');

const router = express.Router();

// Routes for incidents
router.get('/', getInsidens); // GET all incidents
router.post('/', createInsiden); // POST a new incident
router.put('/:id', updateInsiden); // UPDATE an incident
router.delete('/:id', deleteInsiden); // DELETE an incident

module.exports = router;

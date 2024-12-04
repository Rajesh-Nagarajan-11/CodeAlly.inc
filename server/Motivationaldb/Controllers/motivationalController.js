// /motivational/controllers/motivationalController.js
import Motivational from '../models/motivationalModel.js'; // ESM import for the model

// Create a new motivational quote
const createMotivation = async (req, res) => {
  try {
    const { date, motivational } = req.body;

    // Check if a motivational quote already exists for the given date
    const existingMotivation = await Motivational.findOne({ date });
    if (existingMotivation) {
      return res.status(400).json({ message: 'Motivation for this date already exists.' });
    }

    const newMotivation = new Motivational({ date, motivational });
    await newMotivation.save();

    return res.status(201).json(newMotivation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get motivational quote by date
const getMotivationByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const motivation = await Motivational.findOne({ date: new Date(date) });

    if (!motivation) {
      return res.status(404).json({ message: 'Motivation not found for this date.' });
    }

    return res.status(200).json(motivation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { createMotivation, getMotivationByDate }; // ESM export

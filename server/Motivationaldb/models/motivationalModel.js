// /motivational/models/motivationalModel.js
import mongoose from 'mongoose';

const motivationalSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true // Ensures that there is only one motivational quote per date
  },
  motivational: {
    type: String,
    required: true
  }
});

const Motivational = mongoose.model('Motivational', motivationalSchema);

export default Motivational; // ESM export

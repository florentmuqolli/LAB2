const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  days: [String], 
  exercises: [
    {
      name: { type: String, required: true },
      sets: Number,
      reps: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);

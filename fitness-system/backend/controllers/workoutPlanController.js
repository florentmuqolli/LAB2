const WorkoutPlan = require('../models/WorkoutPlan');
const User = require('../models/User');

exports.getWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find().populate('member', 'name email');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createWorkoutPlan = async (req, res) => {
  try {
    const { member, title, description, days, exercises } = req.body;

    const user = await User.findById(member);
    if (!user) return res.status(404).json({ message: 'Member not found' });

    const newPlan = new WorkoutPlan({ member, title, description, days, exercises });
    await newPlan.save();

    res.status(201).json(newPlan);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create workout plan' });
  }
};

exports.updateWorkoutPlan = async (req, res) => {
  try {
    const updated = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Workout plan not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update workout plan' });
  }
};

exports.deleteWorkoutPlan = async (req, res) => {
  try {
    const deleted = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Workout plan not found' });
    res.json({ message: 'Workout plan deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete workout plan' });
  }
};

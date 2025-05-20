const Workout = require('../models/Workout');

exports.getAllWorkouts = async (req, res) => {
  const [rows] = await Workout.getAll();
  res.json(rows);
};

exports.getWorkoutById = async (req, res) => {
  const [rows] = await Workout.getById(req.params.id);
  if (rows.length === 0) return res.status(404).json({ message: 'Workout not found' });
  res.json(rows[0]);
};

exports.createWorkout = async (req, res) => {
  const { name, description, duration, level } = req.body;
  await Workout.create({ name, description, duration, level });
  res.status(201).json({ message: 'Workout created successfully' });
};

exports.updateWorkout = async (req, res) => {
  const { name, description, duration, level } = req.body;
  await Workout.update(req.params.id, { name, description, duration, level });
  res.json({ message: 'Workout updated successfully' });
};

exports.deleteWorkout = async (req, res) => {
  await Workout.delete(req.params.id);
  res.json({ message: 'Workout deleted successfully' });
};

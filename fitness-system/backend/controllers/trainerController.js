const Trainer = require('../models/Trainer');

exports.getAllTrainers = async (req, res) => {
  try {
    const [rows] = await Trainer.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTrainerById = async (req, res) => {
  try {
    const [rows] = await Trainer.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Trainer not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTrainer = async (req, res) => {
  try {
    const { name, email, specialization } = req.body;
    const [result] = await Trainer.create({ name, email, specialization });
    res.status(201).json({ id: result.insertId, name, email, specialization });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTrainer = async (req, res) => {
  try {
    const { name, email, specialization } = req.body;
    const [result] = await Trainer.update(req.params.id, { name, email, specialization });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Trainer not found' });
    res.json({ message: 'Trainer updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTrainer = async (req, res) => {
  try {
    const [result] = await Trainer.delete(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Trainer not found' });
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

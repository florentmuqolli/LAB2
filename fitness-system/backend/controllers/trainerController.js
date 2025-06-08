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
    const { name, email, phone, specialty, experience } = req.body;

    if (!name || !email || !phone || !specialty || !experience) {
      return res.status(400).json({ 
        message: "All fields are required" 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    if (!/^\d{7,15}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number should contain 7-15 digits"
      });
    }
    const expNumber = parseInt(experience);
    if (isNaN(expNumber)) {
      return res.status(400).json({
        message: "Experience must be a number"
      });
    }
    if (expNumber < 0) {
      return res.status(400).json({
        message: "Experience cannot be negative"
      });
    }

    const [existingTrainer] = await Trainer.findByEmail(email);
    if (existingTrainer.length > 0) {
      return res.status(409).json({
        message: "A trainer with this email already exists"
      });
    }

    const [result] = await Trainer.create({ 
      name, 
      email, 
      phone, 
      specialty, 
      experience: expNumber 
    });

    res.status(201).json({ 
      id: result.insertId, 
      name, 
      email, 
      phone, 
      specialty, 
      experience: expNumber 
    });

  } catch (error) {
    console.error("Create trainer error:", error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: "A trainer with this email or phone already exists"
      });
    }
    
    res.status(500).json({ 
      message: error.sqlMessage || "Error creating trainer" 
    });
  }
};

exports.updateTrainer = async (req, res) => {
  try {
    const { name, email, phone, specialty, experience } = req.body;
    
    if (!name || !email || !phone || !specialty || !experience) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const [result] = await Trainer.update(req.params.id, { 
      name, 
      email, 
      phone, 
      specialty, 
      experience 
    });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    const [trainer] = await Trainer.findById(req.params.id);
    res.json({ 
      message: 'Trainer updated successfully',
      trainer: trainer[0]
    });
  } catch (error) {
    console.error('Update trainer error:', error);
    res.status(500).json({ 
      message: error.sqlMessage || 'Server error' 
    });
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

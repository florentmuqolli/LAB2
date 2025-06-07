const Member = require('../models/Member');

exports.getAllMembers = async (req, res) => {
  try {
    const [rows] = await Member.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const [rows] = await Member.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Member not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createMember = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    console.log("body: ",req.body);
    const [result] = await Member.create({ name, email, phone, address });
    res.status(201).json({ id: result.insertId, name, email, phone, address });
  } catch (error) {
    console.error("Create member error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const [result] = await Member.update(req.params.id, { name, email, phone, address });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const [result] = await Member.delete(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

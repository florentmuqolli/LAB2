const db = require('../config/db');

const Trainer = {
  getAll: () => db.query('SELECT * FROM trainers'),
  findById: (id) => db.query('SELECT * FROM trainers WHERE id = ?', [id]),
  findByEmail: (email) => db.query('SELECT * FROM trainers WHERE email = ?', [email]),
  create: (data) => db.query(
    'INSERT INTO trainers (name, email, phone, specialty, experience) VALUES (?, ?, ?, ?, ?)',
    [data.name, data.email, data.phone, data.specialty, data.experience ]
  ),
  update: (id, data) => db.query(
    'UPDATE trainers SET name = ?, email = ?, phone = ?, specialty = ?, experience = ? WHERE id = ?',
    [data.name, data.email, data.phone, data.specialty, data.experience, id]
  ),
  delete: (id) => db.query('DELETE FROM trainers WHERE id = ?', [id]),
};

module.exports = Trainer;
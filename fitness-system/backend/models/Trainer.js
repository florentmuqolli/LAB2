const db = require('../config/db');

const Trainer = {
  getAll: () => db.query('SELECT * FROM trainers'),
  getById: (id) => db.query('SELECT * FROM trainers WHERE id = ?', [id]),
  create: (data) => db.query(
    'INSERT INTO trainers (name, email, specialization) VALUES (?, ?, ?)',
    [data.name, data.email, data.specialization]
  ),
  update: (id, data) => db.query(
    'UPDATE trainers SET name = ?, email = ?, specialization = ? WHERE id = ?',
    [data.name, data.email, data.specialization, id]
  ),
  delete: (id) => db.query('DELETE FROM trainers WHERE id = ?', [id]),
};

module.exports = Trainer;
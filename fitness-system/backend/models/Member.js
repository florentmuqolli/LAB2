const db = require('../config/db');

const Member = {
  getAll: () => db.query('SELECT * FROM members'),
  getById: (id) => db.query('SELECT * FROM members WHERE id = ?', [id]),
  create: (data) => db.query(
    'INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)', 
    [data.name, data.email, data.phone, data.address]
  ),
  update: (id, data) => db.query(
    'UPDATE members SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
    [data.name, data.email, data.phone, data.address, id]
  ),
  delete: (id) => db.query('DELETE FROM members WHERE id = ?', [id]),
};

module.exports = Member;

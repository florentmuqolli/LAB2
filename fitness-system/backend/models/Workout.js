const db = require('../config/db');

const Workout = {
  getAll: () => db.query('SELECT * FROM workouts'),
  getById: (id) => db.query('SELECT * FROM workouts WHERE id = ?', [id]),
  create: (data) =>
    db.query('INSERT INTO workouts (name, description, duration, level) VALUES (?, ?, ?, ?)', [
      data.name,
      data.description,
      data.duration,
      data.level,
    ]),
  update: (id, data) =>
    db.query(
      'UPDATE workouts SET name = ?, description = ?, duration = ?, level = ? WHERE id = ?',
      [data.name, data.description, data.duration, data.level, id]
    ),
  delete: (id) => db.query('DELETE FROM workouts WHERE id = ?', [id]),
};

module.exports = Workout;

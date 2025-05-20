const pool = require('../config/db');

const Subscription = {
  getAll: () => pool.query('SELECT * FROM subscriptions'),

  getById: (id) => pool.query('SELECT * FROM subscriptions WHERE id = ?', [id]),

  create: (data) =>
    pool.query(
      'INSERT INTO subscriptions (memberId, planName, price, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?)',
      [data.memberId, data.planName, data.price, data.startDate, data.endDate, data.status || 'active']
    ),

  update: (id, data) =>
    pool.query(
      'UPDATE subscriptions SET planName = ?, price = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?',
      [data.planName, data.price, data.startDate, data.endDate, data.status, id]
    ),

  delete: (id) => pool.query('DELETE FROM subscriptions WHERE id = ?', [id]),
};

module.exports = Subscription;

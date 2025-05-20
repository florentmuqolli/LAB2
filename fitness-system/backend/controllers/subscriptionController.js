const Subscription = require('../models/Subscription');

exports.getAllSubscriptions = async (req, res) => {
  try {
    const [subscriptions] = await Subscription.getAll();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscriptions', error: err });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const [rows] = await Subscription.getById(req.params.id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscription', error: err });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const [result] = await Subscription.create(req.body);
    res.status(201).json({ message: 'Subscription created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating subscription', error: err });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const [result] = await Subscription.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json({ message: 'Subscription updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating subscription', error: err });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const [result] = await Subscription.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting subscription', error: err });
  }
};

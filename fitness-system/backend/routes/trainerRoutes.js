const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', authenticateToken, authorizeRoles('admin'), trainerController.getAllTrainers);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'trainer'), trainerController.getTrainerById);
router.post('/', authenticateToken, authorizeRoles('admin'), trainerController.createTrainer);
router.put('/:id', authenticateToken, authorizeRoles('admin'), trainerController.updateTrainer);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), trainerController.deleteTrainer);

module.exports = router;
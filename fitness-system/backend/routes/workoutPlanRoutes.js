const express = require('express');
const {
  getWorkoutPlans,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} = require('../controllers/workoutPlanController');

const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getWorkoutPlans);
router.post('/', authenticateToken, authorizeRoles('admin', 'trainer'), createWorkoutPlan);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'trainer'), updateWorkoutPlan);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'trainer'), deleteWorkoutPlan);

module.exports = router;

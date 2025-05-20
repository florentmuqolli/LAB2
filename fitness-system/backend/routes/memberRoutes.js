const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', authenticateToken, authorizeRoles('admin', 'trainer'), memberController.getAllMembers);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'trainer', 'member'), memberController.getMemberById);
router.post('/', authenticateToken, authorizeRoles('admin'), memberController.createMember);
router.put('/:id', authenticateToken, authorizeRoles('admin'), memberController.updateMember);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), memberController.deleteMember);

module.exports = router;

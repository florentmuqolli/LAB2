const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.post('/register', memberController.register);
router.post('/login', memberController.login);
router.post('/refresh-token', memberController.refreshToken);
router.post('/logout', memberController.logout);
router.get('/', memberController.getAllMembers, requireRole('admin'));
router.put('/:id', memberController.updateMember, requireRole('admin'));

router.get('/profile', authMiddleware.authenticate, (req, res) => {
  res.json({ message: `Welcome, member ${req.memberId}!` });
});

router.get('/admin-dashboard', 
    authMiddleware.authenticate, 
    requireRole('admin'),
    (req, res) => {
      res.json({ message: 'Admin dashboard' });
    }
  );
  
  router.get('/trainer-tools',
    authMiddleware.authenticate,
    (req, res, next) => {
      if (!['trainer', 'admin'].includes(req.memberRole)) {
        return res.status(403).json({ error: 'Requires trainer role' });
      }
      next();
    },
    (req, res) => {
      res.json({ message: 'Trainer tools' });
    }
  );

module.exports = router;
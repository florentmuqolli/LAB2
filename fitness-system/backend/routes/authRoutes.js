const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authenticateToken} = require('../middleware/auth')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get("/me", authenticateToken, authController.getUserProfile);
router.put("/me", authenticateToken, authController.updateUserProfile);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.privateRoute, authController.logoutUser);
router.get('/', authController.privateRoute, authController.getUser);
router.get('/:username', authController.privateRoute, authController.getUsersByName);

module.exports = router;
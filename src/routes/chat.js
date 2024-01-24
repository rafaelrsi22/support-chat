const express = require('express');

const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express();

router.post('/', authController.privateRoute, chatController.createMessage);
router.get('/', authController.privateRoute, chatController.getMessages);
router.get('/:userId', authController.privateRoute, chatController.getUserMessages);

module.exports = router;
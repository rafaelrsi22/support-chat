const express = require('express');

const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express();

router.post('/', authController.privateRoute, chatController.createMessage);

module.exports = router;
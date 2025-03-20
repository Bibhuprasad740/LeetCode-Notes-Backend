const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controller');

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/google/login
router.post('/google/login', authController.googleLogin);

// POST /api/auth/google/register
router.post('/google/register', authController.googleRegister);

module.exports = router;
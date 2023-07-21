/**
 * auth.routes.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();


// Register a new user
router.route('/auth/register').post(AuthController.register);

// Login user and get token
router.route('/auth/login').post(AuthController.login);

module.exports = router;




/**
 * user.routes.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const passport = require('../middlewares/passport')

// Get all users
router.route('/users').get(passport.authenticate('jwt', {session: false}), UserController.getUsers);

// Get one user by username
router.route('/users/:username').get(passport.authenticate('jwt', {session: false}), UserController.getUser);

module.exports = router;

/**
 * user.routes.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/media.controller');
const passport = require('../middlewares/passport')

router.route('/upload/:cuid').post(passport.authenticate('jwt', {session: false}), MediaController.uploadFile);

module.exports = router;

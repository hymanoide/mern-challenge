/**
 * auth.controller.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const jwt = require('jsonwebtoken');
const {secretKey} = require('../config/config');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 *  Register a new user in database and generates a JWT Token
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
register = async (req, res) => {
  try {
    const {email, username, password} = req.body;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 5);

    // New user instance and save to DB
    const user = new User({email, username, password: passwordHash});
    await user.save();

    // Generate JWT token
    const token = jwt.sign({id: user._id}, secretKey, {expiresIn: '1h'});

    // Return the JWT token and user details
    return res.status(201).json({user_details: user, token: token});
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({error: 'Email already registered'});
    }
    res.status(500).json({error: 'Internal Server Error: ' + err});
  }
};

/**
 *  Check if the user exists in DB and generates new JWT and return user details from registered user in DB.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
login = async (req, res, next) => {
  try {
    const {username, password} = req.body;

    // Find the user in the DB by username
    const user = await User.findOne({username});

    // If the user doesn't exist or the password doesn't match, send an error response
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({error: 'Invalid credentials'});
    }
    // Return the JWT token generated and user details
    const token = jwt.sign({id: user._id}, secretKey, {expiresIn: '1h'});

    return res.status(201).json({user_details: user, token: token});

  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};

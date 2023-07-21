/**
 * user.controller.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const User = require('../models/user');

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
getUsers = async (req, res) => {
    User.find().sort('-dateAdded').exec((err, users) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({users});
    });
};

/**
 * Get a single user
 * @param req
 * @param res
 * @returns void
 */
getUser = async (req, res) => {
    User.findOne({username: req.params.username}).exec((err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({user});
    });
};

// /**
//  * Get a single user by id
//  * @param id
//  * @returns User
//  */
// findById = async (id) => {
//   try {
//     // Implement the logic to find the user by ID
//     const user = await User.findOne({ _id: id });
//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

module.exports = {
    getUsers,
    getUser,
    // findById // Native function from Moongose
};

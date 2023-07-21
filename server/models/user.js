/**
 * user.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: 'String', required: true, unique: true},
    username: {type: 'String', required: true, unique: true},
    password: {type: 'String', required: true},
    dateAdded: {type: 'Date', default: Date.now, required: true},

});

module.exports = mongoose.model('User', userSchema);

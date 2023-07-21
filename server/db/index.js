const mongoose = require('mongoose');
const {mongoDBConnectionString} = require('../config/config');

mongoose
    .connect(mongoDBConnectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    });

module.exports = mongoose.connection;

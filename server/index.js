const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const users = require('./routes/user.routes');
const auth = require('./routes/auth.routes');
const media = require('./routes/media.routes');


const passport = require("./middlewares/passport");


// Increased parser limit to upload post images. TODO: Implement front-end validation
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

// middleware passport
app.use(passport.initialize());

// routing
app.use('/api', posts, users, auth, media);


// debug
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

module.exports = app;


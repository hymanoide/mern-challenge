/**
 * passport.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */

const passport = require('passport');
const {ExtractJwt, Strategy} = require('passport-jwt');
const {secretKey} = require('../config/config');
const User = require('../models/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }

});

passport.use(jwtStrategy);

module.exports = passport;

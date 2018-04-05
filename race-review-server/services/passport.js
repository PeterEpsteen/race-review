const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');


// Create local strategy
const localOptions = {usernameField: 'username'};
const localLogin = new localStrategy(localOptions, function(username, password, done) {
    // Verify and call 'done' with user if valid
    User.findOne({username: username}, function(err, user) {
        if (err) {return done(err);}

        if (!user) { return done(null, false); }

        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }

            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});


// options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if user ID exists
    User.findById(payload.sub, function (err, user) {
        if (err)
            return done(err, false);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
    // If it does, call 'done' with that user

    // Otherwise, call 'done' without user
})
// tell passport to use strategy
passport.use(jwtLogin);
passport.use(localLogin);
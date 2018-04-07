const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // Already authenticated via Passport
    res.send( { token: tokenForUser(req.user) } );
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: "Please provide a email, username, and password"});
    }
    
    // see if user already exists
    User.findOne({email: email}, (err, existingUser) => {
        if(err) {return next(err);}

        if(existingUser) {
            return res.status(422).send({error: 'Email already in use'});
        }
    });
    User.findOne({username: username}, (err, existingUser) => {
        if(err) {return next(err);}

        if(existingUser) {
            return res.status(422).send({error: 'Username already in use'});
        }
    });

    const user = new User({
        email: email,
        username: username,
        password: password
    });

    user.save((err) => {
        if (err)
            return next(err);
        res.json({token: tokenForUser(user)});
    });
}
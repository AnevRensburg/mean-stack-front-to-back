const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;

    function handleJWTPayload(jwt_payload, done) {
        console.log('This is the jwt_payload: ', jwt_payload.data);

        User.getUserbyId(jwt_payload.data._id)
        .then((user) => {
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, false));
    }

    let jwtStrategy = new JwtStrategy(opts, handleJWTPayload );

    passport.use(jwtStrategy);
}


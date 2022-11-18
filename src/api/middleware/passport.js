const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const fs = require('fs');
const path = require('path');

const User = require('../models/t_user.model');
const pathToKey = path.join('src/api/utils', '/', 'publicKey.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new Strategy(options, (payload, done) => {
    User.findOne({ where: { id: payload.sub } })
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        })
        .catch(error => done(error, false));
});

module.exports = (passport) => {
    passport.use(strategy);
}

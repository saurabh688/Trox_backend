const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
// const PRIV_KEY = fs.readFileSync('private.pem', {encoding: "utf8"});
const { SALT } = require('../../config/constants/Constants');

const issueJWT = (userID) => {
    const expiresIn = '1d';

    const payload = {
        userID: userID,
        time: Date.now()
    };

    // const options = { expiresIn: expiresIn, algorithm: 'RS256' }
    const options = { expiresIn: expiresIn }

    console.log("Date:", new Date(), "Payload: ", payload);

    const signedToken = jsonwebtoken.sign(payload, SALT, options);

    return {
        token: "Bearer" + signedToken,
        expires: expiresIn
    };
};

const issueRefreshToken = (id, uniqueToken) => {
    const expiresIn = '1y';

    const payload = {
        userID: id,
        userAuthToken: uniqueToken
    };

    // const options = { expiresIn: expiresIn, algorithm: 'RS256' }
    const options = { expiresIn: expiresIn  }

    console.log("Date:", new Date(), "Payload:", payload);

    const signedToken = jsonwebtoken.sign(payload, SALT, options);

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    };
};

module.exports = {
    issueJWT,
    issueRefreshToken
}
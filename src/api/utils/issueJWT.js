const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const pathToKey = path.join('src/api/utils', '/', 'privateKey.pem');
// const pathToKey = path.join('.', '/', 'privateKey.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, {encoding: "utf-8"});

const issueJWT = (userID) => {
    const expiresIn = '1d';

    const payload = {
        userID: userID,
        time: Date.now()
    };

    const options = { expiresIn: expiresIn, algorithm: 'RS256' }

    console.log("Date:", new Date(), "Payload: ", payload);

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, options);

    return {
        token: "Bearer:" + signedToken,
        expires: expiresIn
    };
};

const issueRefreshToken = (id, uniqueToken) => {
    const expiresIn = '1 year';

    const payload = {
        userID: id,
        userAuthToken: uniqueToken
    };

    const options = { expiresIn: expiresIn, algorithm: 'RS256' }

    console.log("Date:", new Date(), "Payload:", payload);

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, options);

    return {
        token: "Bearer:" + signedToken,
        expires: expiresIn
    };
};

// console.log("Issue JWT:", issueJWT('abcdefghijklmnopqrstuvwxyz'));
// console.log("Issue Refresh token:", issueRefreshToken());

module.exports = {
    issueJWT,
    issueRefreshToken
}
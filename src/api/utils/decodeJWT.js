const jwt = require('jsonwebtoken');
const fs = require('fs')
// const PUB_KEY = fs.readFileSync('./certs/public.pem');
const { SALT } = require('../../config/constants/Constants');

const decodeJWT = (header) => {
    console.log("Date:", new Date(), "Header from User service: ", header);

    const jwtToken = header.split(" ")[1];
    console.log("Date:", new Date(), "Token: ", jwtToken);

    const loggedInUserID = jwt.verify(jwtToken, SALT, { algorithms: ['RS256'] }, (err, payload) => {
        if (err) {
            console.log("Date:", new Date(), "Error:", err);
            return null;
        } else {
            const id = payload.sub;
            console.log("Date:", new Date(), "Decoded value: ", payload);
            console.log("Date:", new Date(), "ID: ", id);
            return id;
        }
    });

    console.log("Date:", new Date(), "Decoded id from token: ", loggedInUserID);
    return loggedInUserID;
};


// * Function to decode refresh token
const decodeRefreshToken = (authHeader) => {

    console.log("Date:", new Date(), "Authorization Header:", authHeader);

    // * Spit the received string at empty space and take the 2nd element in array which is the token.
    const token = authHeader.split(" ")[1];
    console.log("Date:", new Date(), "Token:", colors.yellow(token));

    const options = { algorithms: ['RS256'] }

    // * JWT method to verify the existing token and decode to get information.
    const decodedDataFromToken = jwt.verify(token, PUB_KEY, options, (err, payload) => {
        if (err) {
            console.log(err);
            return null;
        } else {
            console.log("Date:", new Date(), "Decoded value:", payload);

            const id = payload.userID;
            console.log("Date:", new Date(), "User ID from t_user:", id);

            const uniqueToken = payload.userAuthToken;
            console.log("Date:", new Date(), "Unique Token from t_user_auth:", uniqueToken);

            return {
                id,
                uniqueToken
            }
        }
    });

    console.log("Date:", new Date(), "Decoded data from refreshToken:", decodedDataFromToken);
    return decodedDataFromToken;
};

module.exports = {
    decodeJWT,
    decodeRefreshToken
};
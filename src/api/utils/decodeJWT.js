const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join('src/api/utils', '/', 'publicKey.pem')
// const pathToKey = path.join('.', '/', 'publicKey.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const decodeJWT = (header) => {
    console.log("Date:", new Date(), "Header from User service: ", header);

    const jwtToken = header.split(" ")[1];
    console.log("Date:", new Date(), "Token: ", jwtToken);

    const loggedInUserID = jwt.verify(jwtToken, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => {
        if (err) {
            console.log("Date:", new Date(), "Error:", err);
            return null;
        } else {
            const id = payload.userID;
            console.log("Date:", new Date(), "Decoded value: ", payload);
            console.log("Date:", new Date(), "ID:", id);
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

// console.log('Date:', new Date(), 'Decode jwt:', decodeJWT('Bearer:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eiIsInRpbWUiOjE2Njg3MTQyNjUxOTUsImlhdCI6MTY2ODcxNDI2NSwiZXhwIjoxNjY4ODAwNjY1fQ.xdET_xdUVie59nyahVZe1H4DVVeXL5LCU2s8mcwty3Y74xyve6-jqzGOwvDVmAWgaV33oGCqg8BOxnMIO3UDM5hHIsQ-50zGA8ZkV7xWSUThsX8yTkeC5QXHSTiopj6MGEiJ19t-43QU2b8K5lKdAjFifqv0TEBvSCreCVFweprVEaOnsex6VhRZYAVti57USHClVT3itxjuxuGhtqd8wGfuGJh4tcoksTjkcrAtNyfpM17k5TvZRVngmOkVZ-UA1ozhEpweEE5XMEnA6Yye5WOkRTR2vh5kr1RRzwy5zjABoY5MofdZnq84fWtHw0dv8G14wPcDRrEIfgov-wmSSxHMTRTlqjIexOHXRZYCK0-EZ3tSSitzgzE89yLzlMTFWQIneaFk5T85v8pcSoylASWNn-LWlb6Wecm5xcEA-y_1H7VhKIXK92pFH5xgUCnD0l0jPLR_8hbLgNQLXOp7wAy7-HPmf0BOX_uPkap2RQcpFmWpf_DDvFsm2L1Y-Odaj5wulQr-_1EvU9rW7CmzBRwqq477ZT9o3v5o1gDND-bbYyttp_-fFh1V693eEHFO7zm19XV9MbdXuWWFB8sOjKBWuLPzlpvItz86fcwM9d4b0ndDYjvj5q4c7sCK72cSfC8j4BJ5GboO-F2ZIV1e9BW15C1pNLx45IxuveeNyJ4'));

module.exports = {
    decodeJWT,
    decodeRefreshToken
};
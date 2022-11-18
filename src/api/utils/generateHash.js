const bcrypt = require('bcryptjs');
const { SALT_ROUND } = require('../../config/constants/Constants');
const fs = require('fs');

// * function to generate salt for hashing
const generateSalt = async (SALT_ROUND) => {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    console.log("Date:", new Date(), "Generated salt:", salt);
    return salt;
}

// console.log("Date:", new Date(), "Generated salt:", generateSalt);

// * function to generate hashed password using bcrypt.js
const generateHash = async (password='secret') => {
    const salt = await generateSalt(SALT_ROUND);
    const hash = await bcrypt.hash(password, salt);
    console.log('Date:', new Date(), 'Hashed password in generateHash function:', hash);
    return {
        HASH: hash,
        SALT: salt
    }
}

module.exports = generateHash;
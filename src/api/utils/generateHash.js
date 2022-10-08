const bcrypt = require('bcryptjs');
const { SALT } = require('../../config/constants/Constants');
const fs = require('fs');

// * function to generate hashed password using bcrypt.js
const generateHash = async (password) => {
    const hash = await bcrypt.hash(password, SALT);
    console.log('Date:', new Date(), 'Hashed password in generateHash function:', hash);
    return hash;
}

module.exports = generateHash;
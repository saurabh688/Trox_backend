const bcrypt = require('bcryptjs');

const comparePassword = async (plainText, hashedPassword) => {
    try {
        let response = bcrypt.compare(plainText, hashedPassword);

        console.log('Date:', new Date(), 'Comparing password:', response);

        if (!response) return {
            success: false,
            message: 'Incorrect Password!'
        };

        return {
            success: true,
            message: 'Correct Password!'
        };
    }
    catch (error) {
        return {
            success: false,
            message: error
        };
    };
};

module.exports = comparePassword;
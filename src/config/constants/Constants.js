require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 4000,
    API_VERSION: "/api/v1",
    SALT: "$2a$20$/SKvBPuijjf3kB1i7S7fbO"
}
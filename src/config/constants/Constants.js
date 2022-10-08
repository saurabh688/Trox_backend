require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 8080,
    API_VERSION: "/api/v1",
    SALT: "$2a$20$/SKvBPuijjf3kB1i7S7fbO"
}
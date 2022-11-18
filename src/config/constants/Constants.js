require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 4000,
    API_VERSION: "/api/v1",
    SALT_ROUND: 10
}
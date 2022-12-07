require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 4000,
    API_VERSION: "/api/v1",
    SALT_ROUND: 10,
    EMAIL_REGEX: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/,
    PHONE_REGEX: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
    AUTH_EMAIL: 'trox.api.v1@gmail.com',
    AUTH_PASS: 'msbqckswudoresua',
    VERIFICATION_SUBJECT: 'VERIFY YOUR EMAIL'
}
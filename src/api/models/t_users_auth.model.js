const { UUID, UUIDV4, STRING, BOOLEAN, DATE } = require('sequelize');

const sequelize = require('../db/db');

const UserAuth = sequelize.define('UserAuth', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: STRING,
        allowNull: false
    },
    phoneNumber: {
        type: STRING,
        unique: true
    },
    emailID: {
        type: STRING,
        validate: {
            isEmail: true
        },
        unique: true
    },
    salt: {
        type: STRING
    },
    password: {
        type: STRING
    },
    uniqueToken: {
        type: STRING
    },
    verificationToken: {
        type: STRING
    },
    status: {
        type: STRING,
        defaultValue: 'active'
    },
    isDeleted: {
        type: BOOLEAN,
        defaultValue: false
    },
    expiresAt: {
        type: DATE
    },
    created_by: {
        type: STRING
    },
    modified_by: {
        type: STRING
    }
});

module.exports = UserAuth;
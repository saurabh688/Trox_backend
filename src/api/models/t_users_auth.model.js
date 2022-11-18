const { UUID, UUIDV4, STRING, BOOLEAN } = require('sequelize');

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
        type: STRING
    },
    emailID: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
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
    userType: {
        type: STRING,
        allowNull: false
    },
    status: {
        type: STRING,
        defaultValue: 'active'
    },
    isDeleted: {
        type: BOOLEAN,
        defaultValue: false
    },
    created_by: {
        type: STRING
    },
    modified_by: {
        type: STRING
    }
});

module.exports = UserAuth;
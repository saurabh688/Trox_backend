const { UUID, UUIDV4, STRING, BOOLEAN } = require('sequelize');

const sequelize = require('../db/db');

const UserAuth = sequelize.define('UserAuth', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    phoneNumber: {
        type: STRING
    },
    emailAddress: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: STRING
    },
    reset_password: {
        type: STRING
    },
    unique_token: {
        type: STRING
    },
    user_type: {
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
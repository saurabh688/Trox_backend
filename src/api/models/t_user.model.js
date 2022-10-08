const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER } = require('sequelize');

const sequelize = require('../db/db');

const User = sequelize.define("User", {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: STRING
    },
    phoneNumber: {
        type: STRING
    },
    emailID: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: STRING
    },
    resetPassword: {
        type: STRING
    },
    uniqueToken: {
        type: STRING
    },
    address: {
        type: STRING
    },
    zip: {
        type: INTEGER
    },
    isDeleted: {
        type: BOOLEAN,
        defaultValue: false
    },
    status: {
        type: STRING,
        defaultValue: 'inactive'
    },
    createdBy: {
        type: STRING
    },
    updatedBy: {
        type: STRING
    }
});

module.exports = User;
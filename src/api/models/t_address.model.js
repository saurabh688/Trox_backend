const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER } = require('sequelize');

const sequelize = require('../db/db');

const Address = sequelize.define('Address', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: STRING,
    },
    emailAddress: {
        type: STRING,
        allowNull: false
    },
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    addressLine1: {
        type: STRING,
        allowNull: false
    },
    addressLine2: {
        type: STRING
    },
    city: {
        type: STRING,
        allowNull: false
    },
    county: {
        type: STRING,
        allowNull: false
    },
    postalCode: {
        type: INTEGER,
        allowNull: false
    },
    stateOrProvince: {
        type: STRING,
    },
    companyName: {
        type: STRING
    },
    dayTimePhone: {
        type: STRING
    },
    eveningPhone: {
        type: STRING
    },
    nameSuffix: {
        type: STRING
    },
    addressType: {
        type: STRING,
        defaultValue: 'HOME',
        allowNull: false
    },
    default: {
        type: BOOLEAN,
        defaultValue: false
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

module.exports = Address;
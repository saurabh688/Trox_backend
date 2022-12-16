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
    emailId: {
        type: STRING,
        allowNull: false
    },
    fullName: {
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
        type: STRING
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
    createdBy: {
        type: STRING
    },
    modifiedBy: {
        type: STRING
    }
});

module.exports = Address;
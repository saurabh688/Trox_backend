const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER } = require('sequelize');

const sequelize = require('../db/db');

const User = sequelize.define("User", {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    emailID: {
        type: STRING,
        validate: {
            isEmail: true,
        },
        trim: true,
        unique: true
    },
    firstName: {
        type: STRING,
        trim: true
    },
    lastName: {
        type: STRING,
        trim: true
    },
    phoneNumber: {
        type: STRING,
        trim: true,
        unique: true
    },
    countryCode: {
        type: STRING,
        trim: true
    },
    storeName: {
        type: STRING,
        trim: true
    },
    address1: {
        type: STRING,
        trim: true
    },
    address2: {
        type: STRING,
        trim: true
    },
    city: {
        type: STRING,
        trim: true
    },
    state: {
        type: STRING,
        trim: true
    },
    country: {
        type: STRING
    },
    zip: {
        type: INTEGER,
    },
    governmentId: {
        type: STRING
    },
    stripeAccount: {
        type: STRING,
        trim: true
    },
    companyName: {
        type: STRING
    },
    websiteUrl: {
        type: STRING
    },
    termsAndCondition: {
        type: BOOLEAN
    },
    isF2A: {
        type: BOOLEAN,
        defaultValue: false
    },
    status: {
        type: STRING,
        defaultValue: 'inactive'
    },
    isDeleted: {
        type: BOOLEAN,
        defaultValue: false
    },
    createdBy: {
        type: STRING
    },
    updatedBy: {
        type: STRING
    }
});

module.exports = User;
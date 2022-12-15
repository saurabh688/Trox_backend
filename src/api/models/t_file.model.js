const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');

const sequelize = require('../db/db');

const Files = sequelize.define('Files', {

    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    file_name: {
        type: STRING
    },
    file_url: {
        type: STRING
    },
    file_extension: {
        type: STRING
    },
    file_location: {
        type: STRING
    },
    file_status: {
        type: INTEGER
    },
    created_by: {
        type: UUID
    },
    modified_by: {
        type: UUID
    } 
});

module.exports = Files;
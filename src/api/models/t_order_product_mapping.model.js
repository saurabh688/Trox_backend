const { UUID, UUIDV4, STRING, INTEGER, REAL } = require('sequelize');

const sequelize = require('../db/db');

const Order_Product_Mapping = sequelize.define('OrderProductMap', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: STRING,
        allowNull: false
    },
    productId: {
        type: STRING,
        allowNull: false
    },
    title: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    brand: {
        type: STRING,
        allowNull: false
    },
    color: {
        type: STRING
    },
    size: {
        type: STRING
    },
    quantity: {
        type: INTEGER
    },
    price: {
        type: REAL,
        allowNull: false
    },
    salePrice: {
        type: REAL,
        allowNull: false
    },
    createdBy: {
        type: STRING
    },
    updateBy: {
        type: STRING
    }
})

module.exports = Order_Product_Mapping;
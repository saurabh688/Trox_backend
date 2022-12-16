const { UUID, UUIDV4, STRING, DATE, DOUBLE, BOOLEAN } = require('sequelize');

const sequelize = require('../db/db');

const Order = sequelize.define('Order', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: STRING,
    },
    orderPaymentStatus: {
        type: STRING,
        defaultValue: 'PENDING',
        allowNull: false
    },
    orderStatus: {
        type: STRING,
        defaultValue: 'PENDING',
        allowNull: false
    },
    paymentMethod: {
        type: STRING
    },
    paymentType: {
        type: STRING
    },
    paymentIntentID: {
        type: STRING
    },
    chargeId: {
        type: STRING
    },
    paypalOrderId: {
        type: STRING
    },
    captureId: {
        type: STRING
    },
    orderDateUTC: {
        type: DATE
    },
    buyerAddress: {
        type: STRING
    },
    shippingAddress: {
        type: STRING,
        allowNull: false
    },
    requestedShippingMethod: {
        type: STRING,
        allowNull: false,
        defaultValue: 'STANDARD'
    },
    deliverByDateUTC: {
        type: DATE,
    },
    shippingLabelURL: {
        type: STRING
    },
    currency: {
        type: STRING,
        allowNull: false,
        defaultValue: 'USD'
    },
    totalPrice: {
        type: DOUBLE,
        allowNull: false
    },
    totalTroxAmount: {
        type: DOUBLE,
        defaultValue: 0.0,
        allowNull: false,
    },
    totalStripeFee: {
        type: DOUBLE,
        defaultValue: 0.0,
        allowNull: false
    },
    totalSellerAmount: {
        type: DOUBLE,
        allowNull: false
    },
    totalTaxPrice: { 
        type: DOUBLE, 
        defaultValue: 0.0, 
        allowNull: false
    },
    totalShippingPrice: {
        type: DOUBLE,
        defaultValue: 0.0,
        allowNull: false
    },
    totalShippingTaxPrice: {
        type: DOUBLE,
        defaultValue: 0.0,
        allowNull: false
    },
    totalGiftOptionPrice: {
        type: DOUBLE,
        defaultValue: 0.0,
        allowNull: false
    },
    totalGiftOptionTaxPrice: {
        type: DOUBLE,
        defaultValue: 0.0,
        allowNull: false
    },
    vatInclusive: { 
        type: BOOLEAN, 
        defaultValue: false 
    },
    totalOrderDiscount: { 
        type: DOUBLE 
    },
    totalShippingDiscount: { 
        type: DOUBLE 
    },
    specialInstructions: { 
        type: STRING 
    },
    privateNotes: { 
        type: STRING 
    },
    paymentTransactionID: { 
        type: STRING 
    },
    siteSourceID: { 
        type: DOUBLE 
    },
    secondaryOrderID: { 
        type: STRING 
    },
    tags: { 
        type: STRING 
    },
    facilitatedTax: { 
        type: BOOLEAN, 
        defaultValue: false 
    },
    mustShipByDateUTC: { 
        type: STRING 
    },
    dcCode: { 
        type: STRING 
    },
    refundID: { 
        type: STRING 
    },
    subscriptionId: { 
        type: STRING, 
        defaultValue: null 
    },
    checkoutId: { 
        type: STRING, 
        defaultValue: null 
    },
    created_by: {
        type: STRING
    },
    modified_by: {
        type: STRING
    }
});

module.exports = Order;
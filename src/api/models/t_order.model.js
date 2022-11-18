const { UUID, UUIDV4, STRING, BOOLEAN, DATE, DOUBLE } = require('sequelize');

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
    sellerId: {
        type: STRING,
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
        type: Number, 
        defaultValue: 0.0, 
        allowNull: false
    },
    totalShippingPrice: {
        type: Number,
        defaultValue: 0.0,
        allowNull: false
    },
    totalShippingTaxPrice: {
        type: Number,
        defaultValue: 0.0,
        allowNull: false
    },
    totalGiftOptionPrice: {
        type: Number,
        defaultValue: 0.0,
        allowNull: false
    },
    totalGiftOptionTaxPrice: {
        type: Number,
        defaultValue: 0.0,
        allowNull: false
    },
    vatInclusive: { 
        type: Boolean, 
        defaultValue: false 
    },
    totalOrderDiscount: { 
        type: Number 
    },
    totalShippingDiscount: { 
        type: Number 
    },
    items: { 
        type: Array 
    },
    specialInstructions: { 
        type: String 
    },
    privateNotes: { 
        type: String 
    },
    paymentTransactionID: { 
        type: String 
    },
    siteSourceID: { 
        type: Number 
    },
    secondaryOrderID: { 
        type: String 
    },
    tags: { 
        type: String 
    },
    facilitatedTax: { 
        type: Boolean, 
        defaultValue: false 
    },
    mustShipByDateUTC: { 
        type: String 
    },
    dcCode: { 
        type: String 
    },
    refundID: { 
        type: String 
    },
    subscriptionId: { 
        type: String, 
        defaultValue: null 
    },
    checkoutId: { 
        type: String, 
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
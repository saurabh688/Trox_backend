const { UUID, UUIDV4, STRING, BOOLEAN, REAL, INTEGER } = require('sequelize');

const sequelize = require('../db/db');

const Cart = sequelize.define('Cart', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: STRING,
        allowNull: false,
        trim: true
    },
    description: {
        type: STRING,
        allowNull: false,
        trim: true
    },
    userId: {
        type: STRING,
        trim: true
    },
    productId: {
        type: STRING,
        trim: true
    },
    category: {
        type: STRING,
        trim: true
    },
    brand: {
        type: STRING,
        trim: true
    },
    condition: {
        type: STRING,
        trim: true
    },
    salePrice: {
        type: REAL,
        trim: true
    },
    shippingCostStandard: {
        type: REAL,
        trim: true
    },
    shippingCostExpedited: {
        type: REAL,
        trim: true
    },
    shippingLength: {
        type: STRING,
        trim: true
    },
    shippingWidth: {
        type: STRING,
        trim: true
    },
    shippingHeight: {
        type: STRING,
        trim: true
    },
    shippingWeight: {
        type: STRING,
        trim: true
    },
    productGroupImageUrl: {
        type: STRING,
        trim: true,
        get() {
            if (this.getDataValue('productGroupImageUrl') != null) {
                return this.getDataValue('productGroupImageUrl').split(',')
            }
            return null
        },
        set(val) {
            this.setDataValue('productGroupImageUrl', val.join(','));
        }
    }, // Array of strings eg: ["https://imageurlindex1", "https:"imageurlindex2"]

    videoUrl: {
        type: STRING,
        trim: true,
        get() {
            if (this.getDataValue('videoUrl') != null) {
                return this.getDataValue('videoUrl').split(',')
            }
            return null
        },
        set(val) {
            this.setDataValue('videoUrl', val.join(','));
        }
    }, // Array of strings

    material: {
        type: STRING,
        trim: true
    }, // Array of strings

    lengthUnit: {
        type: STRING,
        trim: true
    }, // Array of strings

    widthUnit: {
        type: STRING,
        trim: true
    }, // Array of strings

    price: {
        type: REAL,
        trim: true,
        allowNull: false
    }, // Array of float value  eg: [20.90, 21.30, 33.00 ...]

    color: {
        type: STRING,
        get() {
            if (this.getDataValue('color') != null) {
                return this.getDataValue('color').split(',')
            }
            return null
        },
        set(val) {
            this.setDataValue('color', val.join(','));
        }
    }, // Array of strings eg: ["Red", "Blue", "Black"]

    size: {
        type: STRING,
        trim: true,
        get() {
            if (this.getDataValue('size') != null) {
                return this.getDataValue('size').split(',')
            }
            return null
        },
        set(val) {
            this.setDataValue('size', val.join(','));
        }
    },

    quantity: {
        type: INTEGER,
        allowNull: false,
    }, // Array of Numbers eg: [25, 35, 45...]

    listingStatus: {
        type: STRING,
        allowNull: false
    }, // Array of strings eg: ["Live", "Live"]

    sellerSKU: {
        type: STRING,
        trim: true
    },

    parentSKU: {
        type: STRING,
        trim: true
    },

    selectedSize: {
        type: STRING,
        trim: true
    },
    selectedColor: {
        type: STRING,
        trim: true
    },
    totalPrice: {
        type: REAL,
        trim: true
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
    },
});

module.exports = Cart;

// selectedSize, selectedColor, totalPrice, totalSellPrice, quantity
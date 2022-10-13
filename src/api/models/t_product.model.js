const { UUID, UUIDV4, STRING, BOOLEAN, REAL, INTEGER, TEXT, ARRAY } = require('sequelize');

const sequelize = require('../db/db');

const Product = sequelize.define('Product', {
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
        type: STRING
    }, // Array of strings eg: ["Red", "Blue", "Black"]

    size: {
        type: STRING,
        trim: true
    },

    quantity: {
        type: INTEGER,
        allowNull: false
    }, // Array of Numbers eg: [25, 35, 45...]

    listingStatus: {
        type: STRING,
        allowNull: false
    }, // Array of strings eg: ["Live", "Live"]

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
}, {
    indexes: [
        {
            unique: true,
            fields: ['title', 'description', 'brand']
        }
    ]
});

module.exports = Product;
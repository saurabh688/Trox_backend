const validateAddressDetails = (addressData) => {
    const { userId, emailId, fullName, addressLine1, city, postalCode, addressType } = addressData;

    if (!userId || !emailId || !fullName || !addressLine1 || !city || !postalCode || !addressType) return {
        success: false,
        message: "Please provide required details: 'User Id', 'Email Id', 'Full Name', 'Address Line 1', 'City', 'Postal Code', 'Address Type'!"
    };

    if (!(typeof postalCode == "number")) return {
        success: false,
        message: 'Postal code should be digits!'
    };

    return {
        success: true,
        message: 'Details verified!',
        data: addressData
    };
};

module.exports = validateAddressDetails;
const fs = require('fs');

let obj = {
    "title": "Product 2000",
    "description": "Product 2000 description",
    "price": 2015,
    "quantity": 1,
    "listingStatus": "Live"
}


let objectList = []
let titleList = obj.title.split(" ");
let descriptionList = obj.description.split(" ");

for (let index = 2000; index <= 4000; index++) {
    obj.title = `${titleList[0]} ${index}`;
    // console.log("Title:", obj.title);
    obj.description = `${descriptionList[0]} ${index} ${descriptionList[2]}`
    // console.log("Description:", obj.description);
    obj.price += index;
    // console.log("Price:", obj.price);
    objectList.push({...obj, "title":obj.title, "description":obj.description, "price":obj.price});
}

// console.log(objectList);
// let objectString = JSON.stringify(objectList);
// fs.writeFile("testData.json", objectString, function(err, result){
//     if(err) console.log("Error:", err);
// });

const { VERIFY_EMAIL, VERIFY_PHONE } = require('../validations/validateEmailOrPhone');


const functionToVerifyRequiredDetails = (emailID_or_phone, password) => {
    if (!emailID_or_phone) {
        return {
            success: false,
            message: 'Please enter your email ID or phone number!'
        }
    }

    if (!password) {
        return {
            success: false,
            message: 'Please enter your password!'
        }
    }

    let verifyEmail = VERIFY_EMAIL(emailID_or_phone);
    let verifyPhone = VERIFY_PHONE(emailID_or_phone);

    if (!verifyEmail && !verifyPhone) {
        return {
            success: false,
            message: 'You email or phone number is invalid!'
        }
    }

    if (!verifyEmail && verifyPhone) {
        return {
            success: true,
            message: 'Required details provided!'
        }
    }

    if (!verifyPhone && verifyEmail) {
        return {
            success: true,
            message: 'Required details provided!'
        }
    }
}

// console.log('Date:', new Date(), 'verify required details:', functionToVerifyRequiredDetails('', 'password123'))
// console.log('Date:', new Date(), 'verify required details:', functionToVerifyRequiredDetails('sahuihar0602@gmail.com', ''))
// console.log('Date:', new Date(), 'verify required details:', functionToVerifyRequiredDetails('sahuihar 0602 @ gmail.com', 'password123'))
// console.log('Date:', new Date(), 'verify required details:', functionToVerifyRequiredDetails('+1/201/253/8925', 'password123'))
// console.log('Date:', new Date(), 'verify required details:', functionToVerifyRequiredDetails('+1 201 253-8925', 'password123'))
// console.log('Date:', new Date(), 'verify required details:', functionToVerifyRequiredDetails('sahunihar0602@gmail.com', 'password123'))


// let string1 = '$2a$10$jRBK9Ahl2uQhY0gI598eG.9wrQc4gS.JQIYCzaLMWTMYSGYKYd7ui'
// let string2 = '$2a$10$n1fiahWMuvnJlMCPTXu6P.lFPrhE0DpsEE5LhBNvtNq3/e6y78mIe'

// console.log('date:', new Date(), 'Compare two string:', string1.localeCompare(string2, undefined, { sensitivity: 'base' }));
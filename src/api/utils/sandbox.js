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
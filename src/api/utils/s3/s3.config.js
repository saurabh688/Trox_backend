const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

const uploadParams = {
    Bucket: process.env.ENVIRONMENT == "PROD" ? process.env.AWS_S3_BUCKET_NAME : process.env.ENVIRONMENT.toLowerCase() + "." + process.env.AWS_S3_BUCKET_NAME,
    Key: '',
    Body: null
}

const s3Upload = (key, buffer) => {

    const params = uploadParams;
    params.Key = key;
    params.Body = buffer;

    return s3.upload(params).promise();
};

const downloadParams = {
    Bucket: process.env.ENVIRONMENT == "PROD" ? process.env.AWS_S3_BUCKET_NAME : process.env.ENVIRONMENT.toLowerCase() + "." + process.env.AWS_S3_BUCKET_NAME,
    Key: ''
};

const s3Download = (key) => {

    const params = downloadParams;
    params.Key = key;

    return s3.getObject(params).createReadStream();
}

const s3DownloadUrl = (key) => {
    const params = downloadParams;
    params.Key = key;
    return s3.getSignedUrl('getObject', params);
}

const deleteParams = {
    Bucket: process.env.ENVIRONMENT == "PROD" ? process.env.AWS_S3_BUCKET_NAME : process.env.ENVIRONMENT.toLowerCase() + "." + process.env.AWS_S3_BUCKET_NAME,
    Delete: {
        Objects: []
    }
};

const s3Delete = (listOfKeyObject) => {

    const params = deleteParams;
    params.Delete.Objects.push(...listOfKeyObject);

    return s3.deleteObjects(params).promise();
};

module.exports = {
    s3Upload,
    s3Download,
    s3DownloadUrl,
    s3Delete
}
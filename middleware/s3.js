var S3 = require('aws-sdk/clients/s3');

var s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION
});

module.exports = s3;

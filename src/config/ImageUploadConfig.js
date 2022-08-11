const multer = require('multer');
// const ID = 'AKIA2MQFOIDYE2XNFPCW';
// const SECRET = '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';
var multerS3 = require("multer-s3");
const BUCKET_NAME = 'ecom-images0607';
const { S3Client, S3 } = require('@aws-sdk/client-s3')
require('dotenv').config();
const { AWS_ID, AWS_SECRET } = process.env
const s3Client = new S3({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: AWS_ID,
        secretAccessKey: AWS_SECRET
    }
});

const upload = multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
    region: 'ap-south-1',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname + file.mimetype.split('/')[1] });
    },
    key: function (req, file, cb) {
        cb(null, "images/" + file.originalname);
    }
})


module.exports = multer({ storage: upload });

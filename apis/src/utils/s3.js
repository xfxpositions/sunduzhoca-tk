import AWS from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";
import { resolve } from "path";
dotenv.config();

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKey = process.env.AWS_ACCESS_KEY;
// const accessKeySecret = process.env.AWS_ACCESS_KEY_SECRET;
const ID = "AKIA45RPADXAVJOFDNH5";
const SECRET = "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";
const BUCKET_NAME = "sunduz-hoca-com";
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});
//uploading
const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: "eu-west-2",
  },
};

const uploadFile = (fileName) => {
  // Read content from the file
  const fileStream = fs.createReadStream(fileName.path);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName.originalname, // File name you want to save as in S3
    Body: fileStream,
  };

  // Uploading files to the bucket
  return s3.upload(params).promise();
};

export { uploadFile };

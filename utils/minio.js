const bucketName = "start"
const secretKEy = "VeI1TE4Hp0JAFIsysJF3MG5cgtxZu3mjgcTxeuZ0"
const accesskey = "cehUtyNLzaFQi8B4dNOx"
const fs = require('fs')
const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint: '192.168.110.100',
    port: 9000, // Your MinIO server port
    useSSL: false, // Set to true if you're using HTTPS
    accessKey: accesskey,
    secretKey: secretKEy,
  });

const expiration = 6 * 24 * 60 * 60; // Expiration time in seconds (1 day in this example)

async function uploadFile(file){
    await minioClient.fPutObject(bucketName, file.originalname, "public/"+file.originalname, (err, etag) => {
        if (err) {
            return console.log(err);
        }
        console.log('File uploaded successfully.');
    });

    const url = await minioClient.presignedGetObject(bucketName, file.originalname, expiration);
    console.log(`Pre-signed URL: ${url}`);
    return url
}

module.exports = {uploadFile}

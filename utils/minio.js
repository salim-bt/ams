const bucketName = "start"
const secretKEy = "VeI1TE4Hp0JAFIsysJF3MG5cgtxZu3mjgcTxeuZ0"
const accesskey = "cehUtyNLzaFQi8B4dNOx"

const Minio = require('minio')

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000, // Your MinIO server port
    useSSL: false, // Set to true if you're using HTTPS
    accessKey: accesskey,
    secretKey: secretKEy,
  });

const objectName = 'coc.png';
const expiration = 24 * 60 * 60; // Expiration time in seconds (1 day in this example)

async function hello(){
    const url = await minioClient.presignedGetObject(bucketName, objectName, expiration);
    console.log(`Pre-signed URL: ${url}`);
}

hello()

// const aws = require("aws-sdk")

// aws.config.update({
//     accessKeyId: "AKIAY3L35MCRZNIRGT6N",
//     secretAccessKey: "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",
//     region: "ap-south-1"
// })


// let uploadFile = async (file:void)=> {
//     return new Promise(function (resolve, reject) {
//         // this function will upload file to aws and return the link
//         let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

//         var uploadParams = {
//             ACL: "public-read",
//             Bucket: "classroom-training-bucket",  //HERE
//             Key: "abc/" + file.originalname, //HERE 
//             Body: file.buffer
//         }


//         s3.upload(uploadParams, function (err, data) {
//             if (err) {
//                 return reject({ "error": err })
//             }
//             return resolve(data.Location)
//         })


//     })
// }




// module.exports = { uploadFile }


import aws, { S3 } from 'aws-sdk';

aws.config.update({
  accessKeyId: 'AKIAY3L35MCRZNIRGT6N',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

interface UploadedFile {
  buffer: Buffer;
  originalname: string;
}

interface UploadResult {
  Location: string;
}

const uploadFile = async (file: UploadedFile): Promise<string> => {
  return new Promise(function (resolve, reject) {
    // this function will upload file to aws and return the link
    let s3: S3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws

    var uploadParams = {
      ACL: 'public-read',
      Bucket: 'classroom-training-bucket', //HERE
      Key: 'abc/' + file.originalname, //HERE
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err: Error, data: UploadResult) {
      if (err) {
        return reject({ error: err });
      }
      return resolve(data.Location);
    });
  });
};

export default uploadFile;

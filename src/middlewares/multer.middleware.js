/*
Multer is a popular Node.js middleware used for handling 
multipart/form-data, which is primarily used for uploading files via HTTP requests.
*/
// multer upload file locally on our server


import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ storage: storage })



  // cb-callback
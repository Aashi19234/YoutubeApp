import {v2 as cloudinary} from "cloudinary"

import fs from "fs" // file system h 

import { v2 as cloudinary } from 'cloudinary';


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    

    import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: 'diwt649vq', 
        api_key: '332555357942144', 
        api_secret: '<your_api_secret>' // Click 'View Credentials' below to copy your API secret
    });


    const uploadoncloudinary=async(localfilepath)=>{
        try{
            if(!localfilepath) return null
            // upload the file on cloudinary
           const response= await cloudinary.uploader.upload(localfilepath,{
                resource_type:"auto"
            })
// file has been uploaded successfully
console.log("file is uploaded on cloudinary",response.url);
return response;
        } catch(error){
           // file upload ni hui toh safe cleaning purpose se hme us file ko ane server se hata dena chahie vrna bahot saari corrupted
           // files aa jaegi 
           fs.unlinkSync(localfilepath) // remove the locally saved temporary file as the upload operaton got failed
           return null;

        }
    }
    
   export {uploadoncloudinary}
       
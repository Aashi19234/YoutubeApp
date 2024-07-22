import { asynchandler } from "../utils/asynchandler.js";
import {Apierror} from "../utils/Apierror.js"
import {User} from "../models/user.models.js"
import {uploadoncloudinary} from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens= async(userid)=>{
try{
const user= await User.findById(userid)
const refreshtoken= user.generateRefreshToken()
const accesstoken= user.generateAccessToken()
user.refreshtoken=refreshtoken
await user.save({validateBeforeSave: false})

return {accesstoken,refreshtoken}
}
catch (error){
throw new Apierror('Something went wrong while generating access and refresh token')

}
}

const registeruser=asynchandler( async (req,res)=>{
    // user details req m milti h generally
    const {fullname,email,username,password}=req.body
    console.log("email: ", email);
    if(
        [fullname,email,username,password]
        .some((field)=>field?.trim()==="")
// .some() condition check krega return krega true ya false toh sb fields check ho gai

    ){
throw new Apierror(400,"All fields are required")
    }

    // check for if user is already interested
    const existeduser=await User.findOne({
        $or:[{username},{email}]// yaha pr dono values check ho jaegi ki ya toh y username ho ya mail

    })
    if(existeduser){
        throw new Apierror(409,"User with email or username already exists")

    }
    const avatarlocalpath= req.files?.avatar?.[0]?.path; // images
  const coverimagelocalpath=  req.files?.coverimage?.[0]?.path;

if(!avatarlocalpath){
    throw new Apierror(400,"Avatar file is required")
}

const avatar=await uploadoncloudinary(avatarlocalpath)
const coverimage= coverimagelocalpath ? await uploadoncloudinary(coverimagelocalpath) : null;


if(!avatar){
    throw new Apierror(400,"Avatar file not uploaded")
}


// database m entry

// user se hoegi db m entry bcoz vhi db se baat krra h as it is made from mongoose
const user= await User.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverimage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})

const createduser=await User.findById(user._id).select(
    "-password -refreshToken" // remove password,refreshtoken
) // jb mongodb m koi entry hti h tb db ek _id deta h use check krre

if(!createduser){
    throw new Apierror(500,"Something went wrong while registering the user")

}

return res.status(201).json(
    new Apiresponse(200, createduser,"User registered successfully")
)

})

const loginuser=asynchandler(async(req,res)=>{
/*
ALGORITHM:
req body->data
username or email
find the user 
password check 
access and refresh token 
send tokens in cookie
 */

const {email,username,password}=req.body
if(!(username || email)){ // jb username ya email m se koi bhi chlega
    throw new Apierror(400,'username or email is required')
}
const user = await User.findOne({
    $or: [{username},{email}] // yaha ya toh username ke basis pr value mil jae ya email

})

if(!user){
    throw new Apierror(404, 'User does not exists');
}

const ispasswordvalid = await user.isPasswordCorrect(password)

if(!ispasswordvalid){
    throw new Apierror(401, 'Invalid user credentials');
}



const {accesstoken,refreshtoken}=await generateAccessAndRefreshTokens(user._id)

const loggedinuser= await User.findById(user._id)
.select("-password -refreshtoken")

const options={ // cookies
    httpOnly:true,
    secure:true
}// y krne k baad cookies server se modify hngi bss frontend se ni

return res.status(200).cookie("accesstoken", accesstoken,options)
.cookie("refreshtoken", refreshtoken,options)
.json(
    new Apiresponse(
        200,
        {
            user:loggedinuser,accesstoken,refreshtoken
        },
        "User logged in successfully"
    )


)

})

const logoutuser=asynchandler(async(req,res)=>{
   await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined // set se value update krte h

            }

        },
        {
            new:true
        }
        


    )
    const options={ // cookies
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accesstoken", options)
    .clearCookie("refreshtoken", options)
    .json(new Apiresponse(200, {},"User logged out") )
})

const refreshAccessToken= asynchandler(async(req,res)=>{
    const incomingrefreshtoken= req.cookies.refreshToken || req.body.refreshToken
    if(!incomingrefreshtoken){
        throw new Apierror(401, "Unauthorised request")
    }
   try {
    const decodedtoken= jwt.verify(
         incomingrefreshtoken,
         process.env.REFRESH_TOKEN_SECRET
     )
 
   const user=  await  User.findById(decodedtoken?._id)
   if(!user){
     throw new Apierror(401,"Invalid refresh token")
   }  
   if(incomingrefreshtoken!=user?.refreshToken){
     throw new Apierror(401,"Refresh token is expired or used")
   }
 
   const options={
     httpOnly:true,
     secure:true
   }
  const {accessToken,newrefreshToken}=await  generateAccessAndRefreshTokens(user._id)
 
  return res.status(200)
  .cookie("refreshToken",newrefreshToken ,options)
  .cookie("accessToken",accessToken ,options)
  .json(
     new Apiresponse(200,
         {
         accessToken,refreshToken:newrefreshToken},
         "Access token refreshed"
     )
  )
   } catch (error) {
    throw new Apierror(401,error?.message ||"Invalid refresh token")

    
   }
})

const changeCurrentPassword=asynchandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body
  
    const user=await User.findById(req.user?._id)

   const isPasswordCorrect=await  user.isPasswordCorrect(oldPassword)
   if(!isPasswordCorrect){
    throw new Apierror(400,"Invalid old password")
   }
   user.password=newPassword
  await user.save({validateBeforeSave:false})

  return res.status(200)
  .json(new Apiresponse(200,{},"Password changed successfully"))

})

const getcurrentuser=asynchandler(async(req,res)=>{
    return res.status(200)
    .json(200,req.user,"current user fetched successfully")
})

const updateaccountdetails=asynchandler(async(req,res)=>{
    const {fullname,email}=req.body
    if(!fullname || !email){
        throw new Apierror(400,"All fields are required")
    }
   const user= User.findByIdAndUpdate(req.user?._id,
{
    $set:{
        fullname,
        email
    }
},
{new:true} // it returns updated information
    
    ).select("-password")
    
    return res.status(200)
    .json(new Apiresponse(200,user, "Account details updated successfully")
)
})

const updateuseravatar=asynchandler(async(req,res)=>{
  const avatarlocapath=  req.file?.path
  if(!avatarlocapath){
    throw new Apierror(400,"Avatar file is missing")
  }
  const avatar=await uploadoncloudinary(avatarlocapath)
  if(!avatar.url){
    throw new Apierror(400,"Error while uploading avatar")

  }

  const user=await User.findByIdAndUpdate(
    req.user?._id,
    {
        $set:{
            avatar:avatar.url
        }
    },
    {new:true}
  ).select("-password")

  return res.status(200)
    .json(new Apiresponse(200,user,"Avatar updated successfully"))


})

const updateusercoverimage=asynchandler(async(req,res)=>{
    const coverimagelocapath=  req.file?.path
    if(!coverimagelocapath){
      throw new Apierror(400,"Cover Image is missing")
    }
    const coverimage=await uploadoncloudinary(coverimagelocapath)
    if(!coverimage.url){
      throw new Apierror(400,"Error while uploading coverimage")
  
    }
  
   const user= await User.findByIdAndUpdate(
      req.user?._id,
      {
          $set:{
              coverimage:coverimage.url
          }
      },
      {new:true}
    ).select("-password")

    return res.status(200)
    .json(new Apiresponse(200,user,"Coverimage updated successfully"))
    
  
  })


export {registeruser,loginuser,
    logoutuser,refreshAccessToken
, changeCurrentPassword,getcurrentuser,updateaccountdetails,
 updateuseravatar,updateusercoverimage}


// How to do api testing?
// through thunder client, vese toh kaafi options h
// we will use postman 



/*
We will build a logic for registering a user.

How to do it?
1) get user details from frontend, details mentioned in user model
2 validation check- not empty
3) check if user is already exists: from username,email
4) check for images , check for avatar
5) upload them to cloudinary,avatar
6) create user object bcoz mongodb m data objects k through upload kia jate haii
7) create entry in db
8) remove password and refresh token field from response
9) check for user creation
10) return response




User jo h vo mongoose ka user hai isme hm mongodb k methods le skte h.
user hmara apna h isme hm mongodb  methods ni le skte





*/
import { asynchandler } from "../utils/asynchandler.js";
import {Apierror} from "../utils/Apierror.js"
import {User} from "../models/user.models.js"
import {uploadoncloudinary} from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";


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
req body->data
username or email
find the user 
password check 
access and refresh token 
send tokens in cookie
 */

const {email,username,password}=req.body
if(!username || !email){
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

})

const {accesstoken,refreshtoken}=await generateAccessAndRefreshTokens(user._id)




export {registeruser,loginuser}


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
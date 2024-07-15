// it will verify whether user exists or not


import { Apierror } from "../utils/Apierror";
import { asynchandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models";

export const verifyjwt=asynchandler(async(req,res,next)=>{
  try {
     const token=  req.cookies?.accesstoken ||
       req.header('Authorization')?.("Bearer","")
  
       if(!token){
          throw new Apierror(401,"Unauthorised request")
       }
     const decodedtoken =   jwt.verify(token,
      process.env.ACCESS_TOKEN_SECRET)
  
    const user=   await User.findById(decodedtoken?._id).select(
          "-password -refreshtoken"
      )
      if(!user){
          throw new Apierror(401,"Invalid Access Token")
      }
  req.user=user;
  next()
  } catch (error) {
    throw new Apierror(401,error?.message || "Invalid acess tokem")
    
  }
    
})
// next means ki this  task is completed now u can this to either next middleare or to response
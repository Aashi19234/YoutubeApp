import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userschema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true // this will make username field searchable optimisely

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    avatar:{
        type:String, // cloudinary url will be used 
        required:true,


    },
    coverimage:{
        type:String
    },
    watchHistory:[
{
    type:Schema.Types.ObjectId,
    ref:"Video"
}
    ],// multiple values aaegi yaha
    password:{
        type:String,
        required:[true,'Password is required']

    },
    refreshToken:{
        type:String
    }


  
        
        
    

},{timestamps:true})

// pre hook
userschema.pre("save",async function (next){
    if(! this.isModified("password")) return next() ;//jab data save krega toh hr baari password change hga so password field jb modifcation m jaegi tbhi y run krna uske alava ni vo krne k lie hm y krre h

this.password=bcrypt.hash(this.password, 10)// it takes two parameters : kisko bcrypt krna h and kitnes rounds or salts
next()
})// here we are taking save event , we want some fucntion to be performed before save event

userschema.methods.isPasswordCorrect= async function(password){
   return await bcrypt.compare(password,this.password)// this.password is encrypted one

}

userschema.methods.generateAccessToken=function(){
return jwt.sign({
    _id:this._id,// database se milega y sb
    email:this.email,
    username:this.username,
    fullname:this.fullname
},
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}
)// sign method generate tokens
}
userschema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,// database se milega y sb
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )// sign method generate tokens
}

export const User=mongoose.model("User",userschema)
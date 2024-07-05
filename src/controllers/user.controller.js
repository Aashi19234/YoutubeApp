import { asynchandler } from "../utils/asynchandler.js";

const registeruser=asynchandler( async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

export {registeruser}


// How to do api testing?
// through thunder client, vese toh kaafi options h
// we will use postman 
//require('dotenv').config({path: '/env'})

import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({ path: './.env' });

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);

    })
})
.catch((err)=>{
    console.log("MONGODB connection failed" , err);
})


//dotenv.config() is called to load environment variables.

// Note: jab asynchronous method complete hta h toh vo ek promise return krta h









/*import mongoose  from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";*/

//const app=express()


// mongoose helps in data modelling and connects to database 
// where data is stored.










/*const connectDB(){}

connectDB()*/

/*This way is also good to connect database but it can be optimised.
through IIFE*/


// this approach is also good but we are gonna try another better approach where we create a different folder

/*(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}
            /${DB_NAME}`)
            app.on("error", ()=>{
                console.log("ERROR", error);
                // jab application talk ni kr paari database se
                throw error


            })
            app.listen(process.env.PORT,()=>{
                console.log(`Application is listening on port ${process.env.PORT}`);

            })

    } catch(error){
        console.error("ERROR: ",error)
        throw err
    }

})()*/

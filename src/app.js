import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"





const app = express()

//configuring cors, cors and cookie are always configured after creating app

app.use( cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

// settings to handle data in backend, url se data, json, body m data
// we will set limits

// congigurations for handling data
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import

import userRouter from './routes/user.routes.js'

// routes declaration

// router ko laane k lie middleware lana pdega
app.use("/api/v1/users", userRouter) // /users pr userrouter aa jaega




export {app} 
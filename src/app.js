// app.js

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credentials : true  
}))

app.use(express.json({limit: "16kb"}))  // Get data from formdata
app.use(express.urlencoded({extended:true, limit: "16kb"}))  // get data from url 
app.use(express.static("public")) 
app.use(cookieParser())

//routes import 
import userRouter from './routes/user.routes.js'

//routes decleration
app.use("/api/v1/user",userRouter)

//http:localhost:8000/api/v1/user/register

export {app}
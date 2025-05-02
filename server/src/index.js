import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";
import { JWT_SECRET } from "./config/env.js";
import connectToDB from "./config/connectToDB.js";
import authRouter from "./routes/auth.route.js";
import errorHandler from './middlewares/errorHandler.js'



const app = express()

// handle uncaughtexceptions in the app
process.on('uncaughtException',(ex) =>{
    console.log('FATAL UNCAUGHT EXCEPTION DETECTED');
    console.log('EXCEPTION', ex)
})
// handler no JWT_SECRET PROVIDED
if(!JWT_SECRET){
    console.log('FATAL NOT JWT SECRET CODE PROVIDED');
    console.log('Please provide JWT SECRET in the env.(production or development).local file');
    process.exit(1)
}

// MIDDLEWARE
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended : false}))

//  use static files
app.use('/public', express.static('public'))
app.use('/image', express.static('image'))


// ROUTES

// Home route
app.get('/', (req, res) =>  res.json({ success: true, message: 'Hello world', statusCode: 200}))

// Handle invalid URL
// app.get('*', (req, res) => res.json({ success:true, message: 'Invalid URL', statusCode: 404}))
app.use('/api/auth', authRouter)


// ERROR HANDLER
app.use(errorHandler)

// connect config files
connectToDB()

export default app
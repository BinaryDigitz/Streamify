import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/env.js";

// Basic schema, Feel free to add yours
const userSchema = mongoose.Schema({
    fullName: {
        type:String,
        requird: true,
        minLength:3,
        maxLength: 50
    },
    email: {
        type:String,
        unique:true,
        requird: true,
        minLength:6,
        maxLength: 50
    },
    password: {
        type:String,
        requird: true,
        minLength:6,
        maxLength: 250
    },
    bio: {
        type:String,
        default: '',
        minLength:6,
        maxLength: 250
    },
    profilePhoto: {
        type:String,
        default: '',
        minLength:6,
        maxLength: 250
    },
    profilePhoto: {
        type:String,
        default: '',
        minLength:6,
        maxLength: 250
    },
    nativeLanguage: {
        type:String,
        default: '',
        minLength:6,
        maxLength: 250
    },
    learningLanguage: {
        type:String,
        default: '',
        minLength:6,
        maxLength: 250
    },
    location: {
        type:String,
        default: '',
        minLength:6,
        maxLength: 250
    },
    isOnboarded: {
        type:Boolean,
        default: false, 
    },
    friends: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
}, { timestamp: true}, {minimize: false })

// Token generation token is stored in the server
// expires in 3 days -> feel free to change the expiry date
userSchema.methods.generateToken = function (){
    return jwt.sign({ userId: this._id}, JWT_SECRET, { expiresIn: '3d'})
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel;
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/env.js";
import bcrypt from 'bcrypt'

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
        maxLength: 250
    },
    profilePhoto: {
        type:String,
        default: '',
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
        
        maxLength: 250
    },
    learningLanguage: {
        type:String,
        default: '',
       
        maxLength: 250
    },
    location: {
        type:String,
        default: '',
        
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
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    try{
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
    catch(ex){
        next(ex)
        console.log(ex.message);
    }
})
userSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
const UserModel = mongoose.model('User', userSchema)

export default UserModel;
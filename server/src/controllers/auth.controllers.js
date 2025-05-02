import UserModel from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcrypt";
import { NODE_ENV } from "../config/env.js";

// SIGN UP: /api/auth/sign-up
export const createUser = asyncHandler(async (req, res) => {
 const { fullName, email, password } = req.body
  // check if user already exist in the database
  const isUserExisting = await UserModel.findOne({ email });
  if (isUserExisting)
    return res.json({
      success: false,
      message: "User Already Exist",
      statusCode: 400,
    });

  const idx = Math.floor(Math.random() * 100 + 1) // generate a number from 1 to 100
  const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
  // save user to database
  let user = await UserModel.create({ fullName, email, password, profilePhoto: randomAvatar });
  await user.save();
 //TODO: create the user in stream as well
  // generate token from the function stored in the database
  const token = user.generateToken();
  // set token to expire in 3 days
  res.cookie("userToken", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  //   destructure user and remove password
  const { password: pass, ...rest } = user._doc;
  return res.json({
    statusCode: 201,
    message: "User Created Successfully",
    token,
    user: rest,
  });
});

// SIGN IN: /api/auth/sign-in
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({
      success: false,
      message: "Invalid Input, Please fill all field",
      statusCode: 400,
    });
  const user = await UserModel.findOne({ email });
  if (!user)
    return res.json({
      success: false,
      message: "Invalid Email or Password",
      statusCode: 400,
    });

  // user is registered in the database
  // verify password
  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword)
    return res.json({
      success: false,
      message: "Invalid Email or Password",
      statusCode: 400,
    });

  // generate token from the function stored in the database
  const token = user.generateToken();

  // Sending the token as cookie and in the response body
  // set token to expire in 3 days
  res.cookie("userToken", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  //   destructure user and remove password
  const { password: pass, ...rest } = user._doc;
  return res.json({
    statusCode: 201,
    message: "Login Successful",
    token,
    user: rest,
  });
});

// LOG OUT :/api/auth/sign-out
export const logout = asyncHandler( async ( req, res ) => {
  res.clearCookie('token')
  res.status(200).json({ success: true, message: 'Log out successful'})
})
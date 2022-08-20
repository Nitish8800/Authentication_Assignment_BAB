const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, phoneNumber, password, pic } = req.body;

  if (!first_name || !last_name || !email || !password || !phoneNumber) {
    res.status(400);
    throw new Error("please fill all the fields");
  }

  const userExits = await User.findOne({ email });

  try {
    if (userExits) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      phoneNumber,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  try {
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    if (user) {
      user.first_name = req.body.first_name || user.first_name;
      user.last_name = req.body.last_name || user.last_name;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        pic: updatedUser.pic,
        password: updatedUser.password,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = { registerUser, authUser, updateUserProfile };

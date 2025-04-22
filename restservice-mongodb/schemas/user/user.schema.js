

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables


/********************* Schema Definition **********************/
const user = new mongoose.Schema({
    
    userID: {type: String, unique: true, required: true, trim: true},
    name: {type: String, required: true, maxlength: 30, trim: true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true,  trim: true },
    contact: { type: String, required: true, unique: true, trim: true },
    userRole: { type: String,  default: 'member'},
    taskAssigned:  {type: Number, default: 0},
    taskDone:  {type: Number, default: 0},
}, {
    timestamps: true
})

user.methods.generateAccessToken = (userID)=>{
  return jwt.sign({
    _id: userID,
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}
const userModel = mongoose.model('user', user);


module.exports  = userModel;
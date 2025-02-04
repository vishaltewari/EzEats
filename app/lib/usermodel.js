const mongoose = require("mongoose");

const usermodel= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    contact:String,
    city:String
});
const User = mongoose.models.User || mongoose.model('User', usermodel);

module.exports = User;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String,
        required: [true, "Please provide an user name!"],
        unique: [true, "User name exít"],},
  
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
  })

  module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema); 
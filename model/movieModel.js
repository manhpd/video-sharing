const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    shareBy: {type: String,
        required: [true, "Please provide an user name!"],
        unique: false
    },
  
    videoId: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },

    description: {
        type: String,
        required: [true, "Please provide a description!"],
        unique: false,
    },

    title: {
        type: String,
        required: [true, "Please provide a title!"],
        unique: false,
    },
  })

  module.exports = mongoose.model.Movies || mongoose.model("Movies", MovieSchema); 
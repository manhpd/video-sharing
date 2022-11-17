const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require database connection
const dbConnect = require("../../config/database");
const User = require("../../model/uerModel");
const Video = require("../../model/movieModel");
const auth = require("../../auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        username: request.body.username,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if username exists
  User.findOne({ username: request.body.username })

    // if username exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            username: user.username,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if user name does not exist
    .catch((e) => {
      response.status(404).send({
        message: "User name not found",
        e,
      });
    });
});

// save video endpoint 
app.post("/saveVideo", (request, response) => {
    const video = new Video({
        shareBy: request.body.shareBy,
        videoId: request.body.videoId,
        title: request.body.title,
        description: request.body.description
    });

    // save the new user
    video
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
        response.status(201).send({
            message: "Video save Successfully",
            result,
        });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
        response.status(500).send({
            message: "Error saving video",
            error,
        });
        });
});

// get all shared video
app.get("/getMovies", (request, response) => {
    Video.find({}, function(err, videos) {
        console.log(videos);
    
        response.send(videos);  
      });
});

// authentication endpoint
app.get("/getList", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;

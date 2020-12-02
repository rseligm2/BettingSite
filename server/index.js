const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

const scores = require('./scores');
const dbRouter = require('./dbRouter');
const User = require('./User.js');
const withAuth = require('./Middleware.js');

require('dotenv').config();
const apiKey = process.env.API_KEY
const secret = process.env.SECRET

const http = require("https");

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(json());
app.use(cookieParser());
// app.use(cors(corsOptions))

app.options('*', cors(corsOptions));

const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post('/api/register', function(req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save(function(err) {
    if (err) {
      console.log(err)
      if(err.code === 11000){
        res.status(409)
          .send("User already exists")
      }else{
        res.status(500)
          .send("Error registering new user please try again.");
      }
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect username or password'
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.status(200).send({
            username: username,
            accessToken: token
          })
          console.log('cookie sent')
        }
      });
    }
  });
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
})

app.use('/scores', scores)
app.use('/database', dbRouter)
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});


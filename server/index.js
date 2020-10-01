const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');

const app = express();
const mongo = require('mongodb').MongoClient
const port = 3001;
const mongoUrl = 'mongodb://localhost:27017'

const scores = require('./scores')

require('dotenv').config();
const apiKey = process.env.API_KEY

const http = require("https");

app.use(json());


mongo.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    const db = client.db('users')
})


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/scores', scores)
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});


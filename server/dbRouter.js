const express = require('express')
const router = express.Router()

const exampleMlb = require('../example.json');
const exampleNfl = require('../examplenfl.json');
const Game = require('./GameSchema.js'); 
const examples = {"mlb" : exampleMlb, "nfl" : exampleNfl}

const {json} = require('body-parser');
router.use(json())

// middleware that is specific to this router
//get current date on request
router.use(function timeLog (req, res, next) {
	next()
})

//function to push a game document to the mongo db. res1 is what gets sent
router.get('/pushGameDocument', function(req1, res1) {
    let league = req1.params["league"]
    res1.send('Sports home page')
})

module.exports = router
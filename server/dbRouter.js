const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()


const exampleMlb = require('../example.json');
const exampleNfl = require('../examplenfl.json');
const exampleNCAAB = require('../examplencaab.json');
const Game = require('./GameSchema.js'); 
const examples = {"mlb" : exampleMlb, "nfl" : exampleNfl, "ncaab" : exampleNCAAB}

const {json} = require('body-parser');
router.use(json())

// middleware that is specific to this router
//get current date on request
router.use(function timeLog (req, res, next) {
	next()
})

//function to push a game document to the mongo db. res1 is what gets sent
router.get('/pushGameDocument/:league', function(req1, res1) {
    const league = req1.params["league"]
    const game = new Game(examples[league]["results"][0])
    console.log(game)
    game.save().then(game => {
      console.log('Game has been added.')
      res1.status(200).json(game)
    })
    .catch(err => handleError(err))
    // res1.status(200).json(examples[league]["results"][0])
})

module.exports = router
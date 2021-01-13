const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()


const exampleMlb = require('../example.json');
const exampleNfl = require('../examplenfl.json');
const exampleNCAAB = require('../examplencaab.json');
const Game = require('./GameSchema.js'); 
const UserBets = require('./UserBetsSchema.js')
const User = require('./User.js');
const examples = {"mlb" : exampleMlb, "nfl" : exampleNfl, "ncaab" : exampleNCAAB}

const {json} = require('body-parser');
router.use(json())

//for testing addbet route
const todaysdate = new Date()
const betexample = {
    user: 'testuser',
    date: todaysdate,
    kind: 'ML',
    game_id: mongoose.ObjectId("5fff566ebd7de1ff763db79c"),
    odds: -110,
    units: 1,
    status: 'PENDING'
}

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
})

//will be post, change to get for testing
router.get('/saveUserBet', function(req, res){
    const { user, date, kind, line, overunder, game_id, odds, units, status } = betexample/*req.body;*/
    let bet = {date, kind, line, overunder, game_id, odds, units, status}
    User.findOne({username: user}, '_id', function(err, id){
        if (err) {
            console.error(err);
            res.status(500)
              .json({
              error: 'Internal error please try again'
            });
        }else{
            UserBets.update(
                { user_id: id }, 
                { $push: { bets: bet } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                }
            );
            res.status(200).send('Bet successfully added');
        }
    })
});

module.exports = router
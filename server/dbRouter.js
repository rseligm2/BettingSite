const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const http = require("https");

require('dotenv').config();
const apiKey = process.env.API_KEY;

const exampleMlb = require('../example.json');
const exampleNfl = require('../examplenfl.json');
const exampleNCAAB = require('../examplencaab.json');
const Game = require('./GameSchema.js'); 
const UserBets = require('./UserBetsSchema.js')
const User = require('./User.js');
const examples = {"mlb" : exampleMlb, "nfl" : exampleNfl, "ncaab" : exampleNCAAB}

const {json} = require('body-parser');
router.use(json())

//http api request options
const options = {
	"method": "GET",
	"hostname": "sportspage-feeds.p.rapidapi.com",
	"port": null,
	"path": `/games?league=nhl`,
	"headers": {
		"x-rapidapi-host": "sportspage-feeds.p.rapidapi.com",
		"x-rapidapi-key": `${apiKey}`,
		"useQueryString": true
	}
};

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

//function to push a game document to the mongo db. res1 is what gets sent, should also be post request
router.get('/test/pushGameDocument/:league', function(req1, res1) {
    const league = req1.params["league"];
    const game = new Game(examples[league]["results"][0]);
    console.log(game);
    game.save().then(game => {
      console.log('Game has been added.');
      res1.status(200).json(game);
    })
    .catch(err => handleError(err));
})

//this may not need to have a route at all in the future
router.get('/pushGameDocument/:league', function(req, res){
    const league = req.params["league"];
    options["path"] = `/games?league=${league}`;
    const req2 = http.request(options, function(res2) {
		let chunks = [];

		res2.on("data", function(chunk) {
			chunks.push(chunk);
		})

		res2.on("end", function() {
			let body = Buffer.concat(chunks);
            let games = JSON.parse(body.toString()).results;
            Game.insertMany(games).then(function(){
                console.log(`${games.length} games inserted`);
            }).catch(function(err){
                console.log(err);
            })
            res.status(200).json(games);
		})
	})
	req2.end()

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

router.get('/PullGameDocuments/:league', function(req, res){
    const league = req.params["league"].toUpperCase();
    console.log(league);
    Game.find({"details.league": league}, function(err, docs){
        if (err) {
            console.error(err);
            res.status(500)
              .json({
              error: 'Internal error please try again'
            });
        } else{
            console.log(docs)
            res.status(200).send(docs);
        }
        
    })

})

module.exports = router
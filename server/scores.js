const express = require('express')
const router = express.Router()

const http = require("https");

const exampleMlb = require('../example.json');
const exampleNfl = require('../examplenfl.json');
const exampleNCAAB = require('../examplencaab.json');
const exampleNHL = require('../examplenhl.json')
const examples = {"mlb" : exampleMlb, "nfl" : exampleNfl, "ncaab" : exampleNCAAB, "nhl" : exampleNHL}

require('dotenv').config();
const apiKey = process.env.API_KEY

function getDate(){
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	let todaysdate = yyyy.toString()+'-'+mm.toString()+'-'+dd.toString();
	return todaysdate
}

const todaysdate = getDate()

const {json} = require('body-parser');
router.use(json())

const options = {
	"method": "GET",
	"hostname": "sportspage-feeds.p.rapidapi.com",
	"port": null,
	"path": `/games?league=mlb&date=${todaysdate}`,
	"headers": {
		"x-rapidapi-host": "sportspage-feeds.p.rapidapi.com",
		"x-rapidapi-key": `${apiKey}`,
		"useQueryString": true
	}
};

function setSportAndDatePath(sport) {
	let currdate = getDate()
	return `/games?league=${sport}&date=${currdate}`
}

// middleware that is specific to this router
//get current date on request
router.use(function timeLog (req, res, next) {
	let currdate = getDate()
	options.path = `/games?league=MLB&date=${currdate}`
	next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Sports home page')
})

//request
router.get('/:league', function(req1, res1) {
	let league = req1.params["league"]
	options["path"] = setSportAndDatePath(league)
	// console.log(options.path)
	const req = http.request(options, function(res) {
		let chunks = [];

		res.on("data", function(chunk) {
			chunks.push(chunk);
		})

		res.on("end", function() {
			let body = Buffer.concat(chunks);
			res1.status(200).json(JSON.parse(body.toString()))
		})
	})
	req.end()
})

//static data simulate request
router.get('/test/:league', function(req1, res1) {
	let league = req1.params["league"]
	options["path"] = setSportAndDatePath(league)
	console.log(options.path)
	res1.status(200).json(examples[league])
})

module.exports = router
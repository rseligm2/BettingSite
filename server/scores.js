const express = require('express')
const router = express.Router()

const http = require("https");

const exampleData = require('../example.json');

require('dotenv').config();
const apiKey = process.env.API_KEY

function getDate(){
	let today = new Date();
	let dd = String(today.getDate() - 1).padStart(1, '0') + 1;
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

// middleware that is specific to this router
//get current date on request
router.use(function timeLog (req, res, next) {
	let currdate = getDate()
	options.path = `/games?league=MLB&date=${currdate}`
	console.log(options.path)
	next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Sports home page')
})
// define the mlb route
router.get('/mlb', function (req1, res1) {
	res1.set('Content-Type', 'application/json; charset=utf-8')
  	const req = http.request(options, function (res) {
		var chunks = [];

		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			var body = Buffer.concat(chunks);
			// res1.status(200).json(JSON.parse(body.toString()))
			res1.status(200).json(exampleData)
		});
	});
	req.end();
})

module.exports = router
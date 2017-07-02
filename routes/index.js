//Pull in our libraries
var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

//Get our access keys
var keys = require('./keys.js');

//Create twitter client
var twitter = new Twitter(keys.twitterKeys);

//Store our tweets
var tweets = [];

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Node Twitter', tweets: tweets});
});

router.post('/', function (req, res) {
    //Get the user name and number of tweets from the form
    var user = req.body.user_name;
    var numTweets = req.body.tweets;

    //Clear out old tweets
    tweets = [];

    //Hit Twitter for the information
    twitter.get('statuses/user_timeline', {screen_name: user, count: numTweets})
        .then(function (tw) {
            //Loop through the results
            for (var i = 0; i < tw.length; i++) {
                tweets.push({timestamp: tw[i]['created_at'], tweet: tw[i]['text']});
            }
            //Render the index page with the tweets
            res.render('index', {title: 'Node Twitter', tweets: tweets});
        })
        .catch(function (error) {
            console.log(error);
            throw error;
        });
});

module.exports = router;

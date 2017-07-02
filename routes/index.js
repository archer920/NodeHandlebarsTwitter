var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var keys = require('./keys.js');

var twitter = new Twitter(keys.twitterKeys);

var tweets = [];

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Node Twitter', tweets: tweets });
});

router.post('/', function(req, res){
   var user = req.body.user_name;
   var numTweets = req.body.tweets;

    twitter.get('statuses/user_timeline', {screen_name: user, count: numTweets})
        .then(function(tw){
            for(var i = 0; i < tw.length; i++){
                tweets.push({timestamp: tw[i]['created_at'], tweet: tw[i]['text']});
            }
            res.render('index', {title: 'Node Twitter', tweets: tweets});
        })
        .catch(function(error){
           console.log(error);
           throw error;
        });
});

module.exports = router;

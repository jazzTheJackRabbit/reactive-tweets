var JSX = require('node-jsx').install()
var React = require('react')
var Tweet = require('./models/Tweet');
// var TweetsApp = require('./components/TweetsApp.react')

module.exports = {
	index: function(req, res){
		console.log('running index')		
		
		Tweet.getTweets(0,0, function(tweets){					
			res.render('home',{
				markup: "markup",
				initialState: JSON.stringify(tweets)
			});
		});		
	},

	pages: function(req,res){

	}
}
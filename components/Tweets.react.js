var React = require('react');
var Tweet = require('./Tweet.react');

module.exports = Tweets = React.createClass({
	getMarkupForAllTweets: function(){
		var tweets_marked_up = this.props.tweets.map(function(tweet){
			return(
				<Tweet tweet={tweet} />
			)
		});
		return(
			{tweets_marked_up}
		);
	},
	render: function(){
		return(
			<ul className="tweets">
				{this.getMarkupForAllTweets()}
			</ul>
		);		
	}
});
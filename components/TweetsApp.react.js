var React = require('react')
var Tweets = require('./Tweets.react')
var NotificationBar = require('./NotificationBar.react')

module.exports = TweetsApp = React.createClass({
	addNewTweet: function(tweet){
		var count = this.state.count + 1;
		var skip = this.state.skip + 1;
		var tweets = this.state.tweets
		tweets.unshift(tweet);

		this.setState({
			count: count,
			skip: skip,
			tweets: tweets
		});
	},

	showNewTweets: function(){		
		var tweets = this.state.tweets;
		tweets.forEach(function(tweet){
			tweet.active = true;
		});

		var count = 0;

		this.setState({
			tweets: tweets,
			count: count
		})
	},

	componentDidMount: function(){
		var socket = io.connect();
		socket.on('tweet', function(tweet){
			this.addNewTweet(tweet);
		}.bind(this));
	},

	getInitialState: function(props){
		props = props || this.props;
		return {
	      tweets: props.tweets,
	      count: 0,
	      page: 0,
	      paging: false,
	      skip: 0,
	      done: false
	    };
	},

	render: function(){
		return(
			<div className="tweet-app">
				<Tweets tweets={this.props.tweets}/>
				<NotificationBar showNewTweets={this.showNewTweets} count={this.state.count}/>
			</div>
		);
	}

});
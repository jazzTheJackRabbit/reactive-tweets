var React = require('react');
var Tweets = require('./Tweets.react');
var NotificationBar = require('./NotificationBar.react');
var Loader = require('./Loader.react');

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

		this.setState({
			tweets: tweets,
			count: 0
		})
	},

	checkWindowScroll: function(e){
	    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	    	if(!this.state.done){
				this.setState({
					paging: true
				});
				this.loadMoreTweetsAtTheBottom();
			}			        
	    }
	},

	loadMoreTweetsAtTheBottom: function(){
		// Get tweets
		var request = new XMLHttpRequest();
		request.open('GET','pages/' + (this.state.page + 1) + '/' + this.state.skip, true);
		request.addEventListener('load', showOldTweets);
		request.send();			
	},

	showOldTweets: function(e){
		var request = e.target;
		if(request.status >= 200 && request.status < 400){
			var page = this.state.page + 1;
			var skip = this.state.skip;
			var tweets = this.state.tweets;

			var oldTweets = JSON.parse(request.responseText);			

			if(oldTweets.length){			
				tweets = tweets.concat(oldTweets);
				console.log(tweets);
				this.setState({
					paging: false,
					page: page,
					skip: skip,
					tweets: tweets
				});
			}	
			else{
				this.setState({				
					paging: false,
					done: true
				})
			}		
		}		
	},

	componentDidMount: function(){
		var socket = io.connect();
		socket.on('tweet', function(tweet){
			this.addNewTweet(tweet);
		}.bind(this));
		window.addEventListener('scroll', this.checkWindowScroll);
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
				<Tweets tweets={this.state.tweets}/>
				<NotificationBar showNewTweets={this.showNewTweets} count={this.state.count}/>
				<Loader paging={this.state.paging}/>
			</div>
		);
	}

});
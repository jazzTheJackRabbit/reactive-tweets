var React = require('react')
var Tweets = require('./Tweets.react')

module.exports = TweetsApp = React.createClass({
	render: function(){
		return(
			<div className="tweet-app">
				<Tweets tweets={this.props.tweets}/>
			</div>
		);
	}
});
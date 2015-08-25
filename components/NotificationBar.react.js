var React = require('react');
module.exports = NotificationBar = React.createClass({
	render: function(){
		var count = this.props.count;
		return(
			<div className={"notification-bar" + (count > 0 ? ' active' : '')}>
				<p><a href="#top" onClick={this.props.showNewTweets}>{count} new tweets</a></p>
			</div>
		);
	}
});
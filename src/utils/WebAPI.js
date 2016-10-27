/**
 * Created by Brian on 10/3/2016.
 */
var TweetActionCreators = require('../actions/TweetActionCreators');

function initializeStreamOfTweets() {
    SnapkiteStreamClient.initialiseStream(TweetActionCreators.receiveTweet);
}

module.exports = {
    initializeStreamOfTweets: initializeStreamOfTweets
}
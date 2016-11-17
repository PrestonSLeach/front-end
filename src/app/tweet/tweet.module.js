import { TweetService } from './tweet.service'

export default
  angular
    .module('twitter-tweet', [])
    .service('$tweet', TweetService)
    .name

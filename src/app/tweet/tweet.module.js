import { tweet } from './tweet.component'
import { TweetService } from './tweet.service'
import { configure } from './tweet.config'

export default
  angular
    .module('twitter-tweet', [])
    .component('tweet', tweet)
    .service('$tweet', TweetService)
    .config(configure)
    .name

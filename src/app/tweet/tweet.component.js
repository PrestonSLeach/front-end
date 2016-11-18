import templateUrl from './tweet.component.html'

/* @ngInject */
class TweetController {
  constructor ($log, $tweet) {
    this.$state = $tweet
    $log.debug('TweetController instantiated')
  }

}

export const tweet = {
  templateUrl,
  controller: TweetController,
  controllerAs: '$tweet'
}

import templateUrl from './tag.component.html'

/* @ngInject */
class TagController {
  constructor ($log, $tag, $stateParams, $scope, $cookies, $tweet) {
    this.$state = $tag
    this.$cookies = $cookies
    // this.$state.init($stateParams.tag)
    $tag.tag = $stateParams.tag
    $tweet.getTweetsByTag($tag.tag)
    // $scope.imagePath = './static/imgs/washedout.png'
    $log.debug('TagController instantiated')
  }

}

export const tag = {
  templateUrl,
  controller: TagController,
  controllerAs: '$tag'
}

import templateUrl from './tag.component.html'

/* @ngInject */
class TagController {
  constructor ($log, $tag, $stateParams, $scope) {
    this.$state = $tag
    // this.$state.init($stateParams.tag)
    this.tag = $stateParams.tag
    $tag.getTweetsByTag(this.tag)
    // $scope.imagePath = './static/imgs/washedout.png'
    $log.debug('TagController instantiated')
  }
}

export const tag = {
  templateUrl,
  controller: TagController,
  controllerAs: '$tag'
}

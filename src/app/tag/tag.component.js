import templateUrl from './tag.component.html'

/* @ngInject */
class TagController {
  constructor ($log, $tag, $stateParams) {
    this.$state = $tag
    // this.$state.init($stateParams.tag)
    this.tag = $stateParams.tag
    $log.debug('TagController instantiated')
  }
}

export const tag = {
  templateUrl,
  controller: TagController,
  controllerAs: '$tag'
}

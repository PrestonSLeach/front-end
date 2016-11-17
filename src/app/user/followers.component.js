import templateUrl from './followers.component.html'

/* @ngInject */
class FollowersController {
  constructor ($log, $followers) {
    this.$state = $followers
    $log.debug('FollowersController instantiated!')
  }
}

export const followers = {
  templateUrl,
  controller: FollowersController,
  controllerAs: '$followers'
}

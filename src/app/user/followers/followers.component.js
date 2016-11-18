import templateUrl from './followers.component.html'

/* @ngInject */
class FollowersController {
  constructor ($log, $followers, $user, $stateParams) {
    this.$state = $followers
    this.username = $stateParams.user
    $user.getFollowers(this.username)
    $log.debug('FollowersController instantiated!')
  }
}

export const followers = {
  templateUrl,
  controller: FollowersController,
  controllerAs: '$followers'
}

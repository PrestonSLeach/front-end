import templateUrl from './following.component.html'

/* @ngInject */
class FollowingController {
  constructor ($log, $following, $user, $stateParams) {
    this.$state = $following
    this.username = $stateParams.user
    $user.getFollowing(this.username)
    $log.debug('FollowingController instantiated!')
  }
}

export const following = {
  templateUrl,
  controller: FollowingController,
  controllerAs: '$following'
}

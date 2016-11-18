export class FollowersService {

  /* ngInject */
  constructor ($log, $user) {
    'ngInject'
    this.$user = $user
    $log.debug('FollowersService')
  }
}

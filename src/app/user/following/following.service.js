export class FollowingService {

  /* ngInject */
  constructor ($log, $user) {
    'ngInject'
    this.$user = $user
    $log.debug('FollowingService')
  }
}

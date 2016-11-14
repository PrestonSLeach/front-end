import templateUrl from './user.component.html'

/* @ngInject */
class UserController {
  constructor ($log, $user) {
    this.$state = $user
    this.message = 'User HTML not yet done'
    $log.debug('UserController instantiated')
  }

  // continueDisabled () {
  //   return !this.$game.exists()
  // }
}

export const user = {
  templateUrl,
  controller: UserController,
  controllerAs: '$user'
}

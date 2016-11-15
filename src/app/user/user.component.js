import templateUrl from './user.component.html'

/* @ngInject */
class UserController {
  constructor ($log, $user, $editUser) {
    this.$state = $user
    this.message = 'User HTML not yet done'
    $editUser.inProgress = false
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

import templateUrl from './editUser.component.html'

/* @ngInject */
class editUserController {
  constructor ($log, $editUser, $login, $state) {
    if (!$login.isLoggedIn) {
      $state.go('login')
    } else {
      this.$state = $editUser

      $editUser.inProgress = true
      // $editUser.clear()
      $editUser.populateProfileInfo()
      $log.debug('editUserController instantiated')
    }
  }
}

export const editUser = {
  templateUrl,
  controller: editUserController,
  controllerAs: '$editUser'
}

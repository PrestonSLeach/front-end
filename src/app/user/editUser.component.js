import templateUrl from './editUser.component.html'

/* @ngInject */
class editUserController {
  constructor ($log, $editUser) {
    this.$state = $editUser
    $editUser.inProgress = true
    // $editUser.clear()
    $log.debug('editUserController instantiated')
  }
}

export const editUser = {
  templateUrl,
  controller: editUserController,
  controllerAs: '$editUser'
}

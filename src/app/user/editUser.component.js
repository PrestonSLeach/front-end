import templateUrl from './editUser.component.html'

/* @ngInject */
class editUserController {
  constructor ($log, $editUser) {
    this.$state = $editUser
    $log.debug('editUserController instantiated')
  }
}

export const editUser = {
  templateUrl,
  controller: editUserController,
  controllerAs: '$editUser'
}

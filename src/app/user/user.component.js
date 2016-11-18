import templateUrl from './user.component.html'

/* @ngInject */
class UserController {
  constructor ($log, $user, $editUser, $mdSidenav, $timeout, $scope, $stateParams) {
    this.$state = $user
  }

}

export const user = {
  templateUrl,
  controller: UserController,
  controllerAs: '$user'
}

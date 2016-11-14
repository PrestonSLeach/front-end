import templateUrl from './login.component.html'

/* @ngInject */
class LoginController {
  constructor ($log, $login, $http) {
    this.$state = $login
    $log.debug('LoginController instantiated')
  }
}

export const login = {
  templateUrl,
  controller: LoginController,
  controllerAs: '$login'
}

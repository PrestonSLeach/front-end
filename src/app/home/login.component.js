import templateUrl from './login.component.html'

/* @ngInject */
class LoginController {
  constructor ($log, $login, $http, $cookies) {
    this.$state = $login
    $log.debug('LoginController instantiated')
    this.$cookies = $cookies
  }

}

export const login = {
  templateUrl,
  controller: LoginController,
  controllerAs: '$login'
}

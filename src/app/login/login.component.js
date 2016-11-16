import templateUrl from './login.component.html'

/* @ngInject */
class LoginController {
  constructor ($log, $login, $http, $cookies, $window, $location) {
    this.$state = $login
    $log.debug('LoginController instantiated')
    this.$cookies = $cookies
    this.$window = $window
    this.$location = $location
  }

}

export const login = {
  templateUrl,
  controller: LoginController,
  controllerAs: '$login'
}

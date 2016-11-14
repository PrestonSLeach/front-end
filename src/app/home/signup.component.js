import templateUrl from './signup.component.html'

/* @ngInject */
class SignupController {
  constructor ($log, $signup) {
    this.$state = $signup
    $log.debug('SignupController instantiated')
  }
}

export const signup = {
  templateUrl,
  controller: SignupController,
  controllerAs: '$signup'
}

export class HomeService {
  initialized = false

  constructor ($log, $login, $signup) {
    'ngInject'
    this.$login = $login
    this.$signup = $signup
    $log.debug('HomeService instantiated!')
  }
}

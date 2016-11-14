export class UserService {
  initialized = false

  constructor ($log, $config) {
    'ngInject'
    this.$config = $config
    $log.debug('UserService instantiated!')
  }

  exists () {
    return this.initialized !== false
  }
}

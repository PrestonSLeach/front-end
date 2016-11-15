export class UserService {
  initialized = false

  constructor ($log, $config, $editUser) {
    'ngInject'
    this.$config = $config
    this.$editUser =$editUser
    $log.debug('UserService instantiated!')
  }

  exists () {
    return this.initialized !== false
  }
}

export class TagService {
  initialized = false

  constructor ($log, $config) {
    'ngInject'
    this.$config = $config
    $log.debug('TagService instantiated!')
  }

  exists () {
    return this.initialized !== false
  }
}

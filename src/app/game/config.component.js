import templateUrl from './config.component.html'

/* @ngInject */
class ConfigController {
  constructor ($log, $config) {
    this.$state = $config
    $log.debug('ConfigController instantiated')
  }
}

export const config = {
  templateUrl,
  controller: ConfigController,
  controllerAs: '$config'
}

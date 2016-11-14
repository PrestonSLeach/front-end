import { home } from './home.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(home)
}

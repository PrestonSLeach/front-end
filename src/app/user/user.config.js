import { user } from './user.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(user)
}

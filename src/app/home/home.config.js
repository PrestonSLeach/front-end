import { home, signup, login } from './home.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(home)
    .state(signup)
    .state(login)
}

import { user, userView, followers } from './user.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(user)
    .state(userView)
    .state(followers)
}

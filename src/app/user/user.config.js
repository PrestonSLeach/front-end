import { user, userView, followers, following } from './user.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(user)
    .state(userView)
    .state(followers)
    .state(following)
}

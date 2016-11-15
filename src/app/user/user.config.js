import { user, editUser } from './user.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(user)
    .state(editUser)
}

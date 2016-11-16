import { editUser } from './editUser.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(editUser)
}

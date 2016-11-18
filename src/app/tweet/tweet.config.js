import { tweet } from './tweet.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(tweet)
}

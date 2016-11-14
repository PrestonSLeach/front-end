import { game, config } from './game.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(game)
    .state(config)
}

import templateUrl from './game.component.html'

/* @ngInject */
class GameController {
  constructor ($log, $game, $stateParams) {
    this.$state = $game
    if ($stateParams.new) {
      this.$state.init()
    }
    $log.debug('GameController instantiated')
  }

  click () {
    this.$state.click()
  }

  addAutoclicker () {
    this.$state.addAutoclicker()
  }

  addAutoclickerDisabled () {
    return !this.$state.canAddAutoclicker()
  }
}

export const game = {
  templateUrl,
  controller: GameController,
  controllerAs: '$game'
}

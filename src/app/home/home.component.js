import templateUrl from './home.component.html'

/* @ngInject */
class HomeController {
  constructor ($log, $game) {
    this.$game = $game
    this.message = 'this is the greatest twitter of All Time'
    $log.debug('HomeController instantiated')
  }

  continueDisabled () {
    return !this.$game.exists()
  }
}

export const home = {
  templateUrl,
  controller: HomeController,
  controllerAs: '$home'
}

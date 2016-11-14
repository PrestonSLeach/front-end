import templateUrl from './home.component.html'

/* @ngInject */
class HomeController {
  constructor ($log, $home, $game, $user) {
    this.$state = $home
    this.$game = $game
    this.$user = $user
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

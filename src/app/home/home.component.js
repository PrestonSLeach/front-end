import templateUrl from './home.component.html'

/* @ngInject */
class HomeController {
  constructor ($log, $home, $game, $user, $cookies) {
    this.$state = $home
    this.$game = $game
    this.$user = $user
    this.$cookies = $cookies
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

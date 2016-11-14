import { game } from './game.component'
import { GameService } from './game.service'
import { config } from './config.component'
import { ConfigService } from './config.service'
import { configure } from './game.config'

export default
  angular
    .module('clicker-game', [])
    .component('game', game)
    .service('$game', GameService)
    .component('config', config)
    .service('$config', ConfigService)
    .config(configure)
    .name

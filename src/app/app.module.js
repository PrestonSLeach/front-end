import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMaterial from 'angular-material'
import ngMessages from 'angular-messages'
import uiRouter from 'angular-ui-router'

import twitterHome from './home/home.module'
import clickerGame from './game/game.module'
import twitterUser from './user/user.module'
import twitterTag from './tag/tag.module'

import { app } from './app.component'
import { configure } from './app.config'
import { visualizeRouting } from './app.run'

export default
  angular
    .module('twitter-app', [
      ngAnimate,
      ngAria,
      ngMaterial,
      ngMessages,
      uiRouter,

      twitterHome,
      clickerGame,
      twitterUser,
      twitterTag
    ])
    .component('app', app)
    .config(configure)
    .run(visualizeRouting)
    .name
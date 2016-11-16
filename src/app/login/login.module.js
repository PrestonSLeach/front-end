import { login } from './login.component'
import { LoginService } from './login.service'
import { configure } from './login.config'

export default
  angular
    .module('twitter-login', [])
    .component('twitterLogin', login)
    .service('$login', LoginService)
    .config(configure)
    .name

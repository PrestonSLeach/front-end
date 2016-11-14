import { home } from './home.component'
import { HomeService } from './home.service'
import { configure } from './home.config'
import { signup } from './signup.component'
import { SignupService } from './signup.service'
import { login } from './login.component'
import { LoginService } from './login.service'

export default
  angular
    .module('twitter-home', [])
    .component('twitterHome', home)
    .service('$home', HomeService)
    .component('signup', signup)
    .service('$signup', SignupService)
    .component('login', login)
    .service('$login', LoginService)
    .config(configure)
    .name

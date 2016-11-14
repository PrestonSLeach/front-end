import { home } from './home.component'
import { configure } from './home.config'

export default
  angular
    .module('twitter-home', [])
    .component('twitterHome', home)
    .config(configure)
    .name

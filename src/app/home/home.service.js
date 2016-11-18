export class HomeService {
  initialized = false

  constructor ($log, $login, $http, $tweet) {
    'ngInject'
    this.$login = $login
    this.$http = $http
    this.$tweet = $tweet
    $log.debug('HomeService instantiated!')
  }

  

}

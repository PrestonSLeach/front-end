export class HomeService {
  initialized = false

  constructor ($log, $login, $http, $tweet, $cookies) {
    'ngInject'
    this.$login = $login
    this.$http = $http
    this.$tweet = $tweet
    this.$cookies = $cookies
    $log.debug('HomeService instantiated!')
  }

  newTweet() {
    let cookies = this.$cookies
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/',
      header: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        'content': this.tweetContent,
        'credentials': {
          'username': cookies.get('username'),
          'password': cookies.get('password')
        }
      }
    }).then(function succeessCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

}

export class HomeService {
  initialized = false

  constructor ($log, $login, $http, $cookies, $tweet, $sce) {
    'ngInject'
    this.$login = $login
    this.$http = $http
    this.$cookies = $cookies
    this.$tweet = $tweet
    this.$sce = $sce
    this.getUserFeed()
    $log.debug('HomeService instantiated!')
  }

  getUserFeed () {
    let homeService = this
    let cookies = this.$cookies

    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + cookies.get('username') + '/feed',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successfulCallBack (response) {
      homeService.userFeed = response.data
      .map(tweet => {
          tweet.content = homeService.$sce.trustAsHtml(tweet.content
            .split(' ')
            .map(word => 
              (word.substring(0, 1) === '#') ? "<a href='tag/" + word.match(/\w+/) + "' style='text-decoration: none'>" + '#' + word.match(/\w+/) + "</a>" + word.substring((word.match(/\w+/).toString().length) + 1) : 
              (word.substring(0, 1) === '@') ? "<a href='user/" + word.substring(1).toLowerCase() + "' style='text-decoration: none'>" + word + "</a>" : word)
            .join(' '))
          return tweet
        })
    }), function errorCallBack (response) {
      console.log(response)
    }
  }

}

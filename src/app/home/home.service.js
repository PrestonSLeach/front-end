export class HomeService {
  initialized = false

  constructor ($log, $login, $http, $cookies) {
    'ngInject'
    this.$login = $login
    this.$http = $http
    this.$cookies = $cookies
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
  	}), function errorCallBack (response) {
  		console.log(response)
  	}
  }

}

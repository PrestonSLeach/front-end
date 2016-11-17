export class TweetService {
  initialized = false

  constructor ($log, $http) {
    'ngInject'
    this.$http = $http
    $log.debug('TweetService instantiated!')
  }

  getTweet(id) {
  	let tweetService = this
  	this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tweets/' + id,
      header: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function succeessCallback (response) {
      tweetService.tweet = response.data
    }, function errorCallback (response) {
      console.log(response)
    })
  }

}
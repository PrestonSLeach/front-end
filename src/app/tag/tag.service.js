export class TagService {
  initialized = false

  constructor ($log, $config, $http) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    $log.debug('TagService instantiated!')
  }

  getTweetsByTag (tag) {
    let tweetService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tags/' + tag,
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      tweetService.tweets = response.data
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  exists () {
    return this.initialized !== false
  }
}

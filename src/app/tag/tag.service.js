export class TagService {
  initialized = false

  constructor ($log, $config, $http, $tweet, $sce, $cookies) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    this.$tweet = $tweet
    this.$sce = $sce
    this.$cookies = $cookies
    this.getMostRecentTags()
    $log.debug('TagService instantiated!')
  }

  getMostRecentTags () {
    let tagService = this
    let tweet = this.$tweet
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tags/trending',
      header: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function succeessCallback (response) {
      tagService.tags = response.data
    }, function errorCallback (response) {
      console.log(response)
    })
  }

}

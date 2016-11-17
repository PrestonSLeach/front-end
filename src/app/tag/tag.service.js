export class TagService {
  initialized = false

  constructor ($log, $config, $http, $tweet) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    this.$tweet = $tweet
    this.getMostRecentTags()
    $log.debug('TagService instantiated!')
  }

  getTweetsByTag (tag) {
    let tagService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tags/' + tag,
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      tagService.tweets = response.data
      let i = 0
      for (i; i < tagService.tweets.length; i++) {
        console.log(tagService.tweets[i].content)
        console.log($tweet.hi())
      }
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  getMostRecentTags () {
    let tagService = this
    let tweet = this.$tweet
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tags/recents',
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

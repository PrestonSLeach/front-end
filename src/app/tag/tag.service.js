export class TagService {
  initialized = false

  constructor ($log, $config, $http, $tweet, $sce) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    this.$tweet = $tweet
    this.$sce = $sce
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
        .map(tweet => {
          tweet.content = tagService.$sce.trustAsHtml(tweet.content
            .split(' ')
            .map(word => (word.substring(0, 1) === '#') ? "<md-button ui-sref='tag({tag:" + word.substring(1) + "})'><a href='tag/" + word.substring(1) + "' style='text-decoration: none'>" + word + "</a></md-button>" : word)
            .join(' '))
          return tweet
        })
      console.log(tagService.tweets[0].content)
    }, function errorCallback (response) {
      console.log(response)
    })
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

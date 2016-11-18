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

repostTweet (tweetId,type) {
    if (type==='reply') document.getElementById('reply').style = 'fill: #64B5F6;';
    if (type==='repost') document.getElementById('repost').style = 'fill: #00E676;';
    if (type==='favorite') document.getElementById('favorite').style = 'fill: #EF5350;';
    let cookies = this.$cookies
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/'+tweetId+'/'+type,
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        'credentials': {
          username: cookies.get('username'),
          password: cookies.get('password')
        },
        content: ''
      }
    }).then(function successCallback (response) {

    }, function errorCallback (response) {
      console.log(response)
    })
  }


    isAuthor = function(username) {
      if (username === this.$cookies.get('username'))
        return true;
      else
        return false;

    }

  deleteTweet (tweetId) {
      let cookies = this.$cookies
      let tagService = this
      this.$http({
        method: 'DELETE',
        url: 'http://localhost:8080/tweets/'+tweetId,
        headers: {
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000/'
        },
        data: {
            username: cookies.get('username'),
            password: cookies.get('password')
        }
      }).then(function successCallback (response) {
        tagService.getTweetsByTag(tagService.tag)
      }, function errorCallback (response) {
        console.log(response)
      })
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
            .map(word =>
              (word.substring(0, 1) === '#') ? "<a href='tag/" + word.substring(1) + "' style='text-decoration: none'>" + '#' + word.match(/\w+/) + "</a>" + word.substring((word.match(/\w+/).toString().length) + 1) :
              (word.substring(0, 1) === '@') ? "<a href='user/" + word.substring(1).toLowerCase() + "' style='text-decoration: none'>" + word + "</a>" : word)
            .join(' '))
          return tweet
        })
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

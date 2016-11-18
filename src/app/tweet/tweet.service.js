export class TweetService {
  initialized = false

  constructor ($log, $http, $cookies, $state, $location, $sce, $window) {
    'ngInject'
    this.$http = $http
    this.$cookies = $cookies
    this.$state = $state
    this.$location = $location
    this.$sce = $sce
    this.$window = $window
    this.testing = 'testing'
    $log.debug('TweetService instantiated!')
  }

  getTweet = function(id) {
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
      return response.data
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  replyToTweet(tweetId) {

  }

  respondToTweet (tweetId, type) {
    let tweetService = this
    let cookies = this.$cookies
    let tweet = this.getTweet(tweetId)
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/' + tweetId + '/' + type,
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
        'content': ''
      }
    }).then(function successCallback (response) {
      tweetService.$state.reload()
      console.log('success')
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  likeTweet (tweetId) {
    let cookies = this.$cookies
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/' + tweetId + '/like',
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
      console.log('success')
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  deleteTweet (tweetId) {
    let cookies = this.$cookies
    let location = this.$location
    let tweetService = this
    this.$http({
      method: 'DELETE',
      url: 'http://localhost:8080/tweets/' + tweetId,
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
      tweetService.$state.reload()
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  formatContentForLinks(content) {
    console.log(content)
    return content.split(' ')
    .map(word =>
      (word.substring(0, 1) === '#') ? "<a href='tag/" + word.match(/\w+/) + "' style='text-decoration: none'>" + '#' + word.match(/\w+/) + "</a>" + word.substring((word.match(/\w+/).toString().length) + 1) :
      (word.substring(0, 1) === '@') ? "<a href='user/" + word.substring(1).toLowerCase() + "' style='text-decoration: none'>" + word + "</a>" : word)
    .join(' ')
  }

  getUserFeed () {
    let tweetService = this
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
      console.log(response.data)
      tweetService.tweets = response.data
      .map(tweet => {
          let repost = tweet.repostof
          while (repost) {
            if(repost.content !== '' && repost.content !== undefined) {
              tweet.repostContent = tweetService.$sce.trustAsHtml('"' + tweetService.formatContentForLinks(repost.content) + '"' + ' - ' + repost.author.username)
            } if(repost.content === undefined ) {
              tweet.flagDeleted = true
            }
            repost = repost.repostof
          }
          if(tweet.content) {
            tweet.content = tweetService.$sce.trustAsHtml(tweetService.formatContentForLinks(tweet.content))
          }
          return tweet
        })
    }), function errorCallBack (response) {
      console.log(response)
    }
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
        .map(tweet => {
          console.log(tweet)
          tweet.content = tweetService.$sce.trustAsHtml(tweet.content
            .split(' ')
            .map(word =>
              (word.substring(0, 1) === '#') ? "<a href='tag/" + word.match(/\w+/) + "' style='text-decoration: none'>" + '#' + word.match(/\w+/) + "</a>" + word.substring((word.match(/\w+/).toString().length) + 1) :
              (word.substring(0, 1) === '@') ? "<a href='user/" + word.substring(1).toLowerCase() + "' style='text-decoration: none'>" + word + "</a>" : word)
            .join(' '))
          tweet.this = tweetService
          return tweet
        })
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  isAuthor = function(username) {
    if (username === this.$cookies.get('username'))
      return true
    else
      return false
  }

}

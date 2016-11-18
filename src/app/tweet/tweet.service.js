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

  respondToTweet (tweetId, type) {
    let tweetService = this
    let cookies = this.$cookies
    let tweet = this.getTweet(tweetId)
    console.log(tweet)
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
    console.log('like' + tweetId)
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
      tweetService.userFeed = response.data
      .map(tweet => {
          tweet.content = tweetService.$sce.trustAsHtml(tweet.content
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

  isAuthor = function(username) {
    if (username === this.$cookies.get('username'))
      return true
    else
      return false
  }

}
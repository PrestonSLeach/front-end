export class TweetService {
  initialized = false

  constructor ($log, $http, $cookies, $state, $location, $sce) {
    'ngInject'
    this.$http = $http
    this.$cookies = $cookies
    this.$state = $state
    this.$location = $location
    this.$sce = $sce
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

  respondToTweet (tweetId,type) {
    let cookies = this.$cookies
    console.log(tweetId + ' ' + type)
    console.log(this.$state.userFeed)
    console.log(this.$location.path())
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
      console.log('success')
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  deleteTweet (tweetId) {
    let cookies = this.$cookies
    let location = this.$location
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
      if (location === '/home') {
        getUserFeed()
      }
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

}
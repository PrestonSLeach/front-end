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

  repostTweet (tweetId,type) {
    let cookies = this.$cookies
    console.log(tweetId + ' ' + type)
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
        }
      }
    }).then(function successCallback (response) {

    }, function errorCallback (response) {
      console.log(response)
    })
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

}
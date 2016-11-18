export class UserService {

  initialized = false

  constructor ($log, $config, $http, $cookies, $location) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    this.$cookies = $cookies
    this.$location = $location
    $log.debug('UserService instantiated!')
  }

  followUser (username) {
    let cookies = this.$cookies
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users/@' + username + '/follow',
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
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  unfollowUser (username) {
    let cookies = this.$cookies
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users/@' + username + '/unfollow',
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
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }
  getFollowers (username) {
    let followerList = this
    let location = this.$location
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/followers',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      followerList.followers = response.data
      followerList.numOfFollowers = response.data.length
      followerList.followers.map(follower => follower.username)
      location.path('/user/' + username + '/followers')
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  getFollowing (username) {
    let followingList = this
    let location = this.$location
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/following',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      followingList.following = response.data
      followingList.numOfFollowing = response.data.length
      followingList.following.map(following => following.username)
      location.path('/user/' + username + '/following')
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  followers = []
}

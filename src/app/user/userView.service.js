export class UserViewService {
  constructor ($log, $config, $editUser, $http, $cookies, $stateParams) {
    'ngInject'
    this.$config = $config
    this.$editUser = $editUser
    this.$http = $http
    this.$cookies = $cookies
    this.getMostRecentUsers
    this.username = $stateParams.user

    this.populateProfileInfo()
    $log.debug('UserViewService instantiated!')
  }

  exists () {
    return this.initialized !== false
  }

  getTweetsByUser (username) {
    this.username = username
    let userService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/tweets/',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      userService.tweets = response.data
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  populateProfileInfo () {
    let cookies = this.$cookies
    let userService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + cookies.get('username'),
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      userService.user.username = response.data.username
      if (response.data.profile.firstName !== undefined) userService.user.firstName = response.data.profile.firstName
      if (response.data.profile.lastName !== undefined) userService.user.lastName = response.data.profile.lastName
      userService.user.email = response.data.profile.email
      if (response.data.profile.phone !== undefined) userService.user.phone = response.data.profile.phone
    }, function errorCallback (response) {
      console.log(response)
    })
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
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/followers',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  getFollowing (username) {
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + username + '/following',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

}

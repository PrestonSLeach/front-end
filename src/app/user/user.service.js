export class UserService {

  initialized = false

  constructor ($log, $config, $http, $cookies) {
    'ngInject'
    this.$config = $config
    this.$http = $http
    this.$cookies = $cookies
    this.getPopular();
    this.getTrending();
    $log.debug('UserService instantiated!')
  }

  checkCurrentProfile(username) {
    let cookies = this.$cookies
    if (username===cookies.get('username'))
      return true
    else
      return false
  }

  people = [
           { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
           { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
           { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
       ];

       goToPerson = function(person, event) {
           $mdDialog.show(
               $mdDialog.alert()
                   .title('Navigating')
                   .textContent('Inspect ' + person)
                   .ariaLabel('Person inspect demo')
                   .ok('Neat!')
                   .targetEvent(event)
           );
       };

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

  getPopular () {
    let cookies = this.$cookies
    let userService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tweets/popular',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      response.data.slice(0,3)
      userService.popularTweets = response.data
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  getTrending () {
    let cookies = this.$cookies
    let userService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tags/trending',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      response.data.slice(0,3)
      userService.trendingTags = response.data
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
}

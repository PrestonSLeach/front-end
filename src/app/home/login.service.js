export class LoginService {

  // username = 'username or email'
  password = 'pw'

  constructor ($log, $http) {
    'ngInject'
    this.$http = $http
    $log.debug('LoginService instantiated')
  }

  loggedIn () {
    if (this.username === undefined) {
      return false
    } else {
      return true
    }
  }

  logIn (username) {
    console.log(this)
    this.username = username
    console.log(username)
    console.log(this)
    // let loginService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/validate/username/exists/@blake'
    }).then(function successCallback (response) {
      console.log(response)
      if (response.data.score === undefined) {
        // userService.clear()
      } else {
        console.log('woah')
        // this.playEnabled = true
        // userService.score = parseInt(response.data.score)
        // userService.autoIncrementers = parseInt(response.data.autoClickers)
      }
    }, function errorCallback (response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    })
  }

}

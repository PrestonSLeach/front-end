export class LoginService {

  constructor ($log, $http, $cookies, $window, $location) {
    'ngInject'
    this.$http = $http
    this.$cookies = $cookies
    // console.log($cookies.getAll())
    this.$window = $window
    this.$location = $location
    this.message = 'this is the greatest twitter of All Time'
    this.loginBoo = true
    this.email
    this.user.password = $cookies.get('password')
    this.user.username = $cookies.get('username')
    this.repeatPassword
    $log.debug('HomeController instantiated')
    this.isLoggedIn = false
  }

  redirect () {
    this.$location.path('/login')
  }

  signUp () {
    let cookies = this.$cookies
    let location = this.$location
    let user = this.user
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        'credentials': {
          username: this.user.username,
          password: this.user.password
        },
        'profile': {
          email: this.user.email
        }
      }
    }).then(function successCallback (response) {
      cookies.put('username', user.username)
      cookies.put('password', user.password)
      location.path('/home')
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  login () {
    let cookies = this.$cookies
    let user = this.user
    let window = this.$window
    let location = this.$location
    let loginService = this

    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/validate/login',
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        username: this.user.username,
        password: this.user.password
      }
    }).then(function successCallback (response) {
      if (response.status === 200) {
        cookies.put('username', user.username)
        cookies.put('password', user.password)
        loginService.isLoggedIn = true
        location.path('/home')
      } else {
        console.log(response)
      }
    }, function errorCallback (response) {
      console.log(response)
      window.alert('You entered invalid credentials. Please try again.')
    })
  }

  loginAvailable () {
    if (this.user.username) {
      if (this.user.password) {
        return true
      }
    }
    return false
  }

  continueDisabled () {
    return !this.$game.exists()
  }

  loginClicked () {
    if (this.loginBoo) {
      this.login()
    } else {
      this.loginBoo = true
    }
  }

  signUpClicked () {
    if (!this.loginBoo) {
      // verify password is the same
      // make sure post command works
      this.signUp()
    } else {
      this.loginBoo = false
    }
  }

  user = {
    username: '',
    email: '',
    phone: '',
    password: ''
  };

}

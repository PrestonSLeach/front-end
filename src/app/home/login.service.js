export class LoginService {

  constructor ($log, $http, $cookies) {
    'ngInject'
    this.$http = $http
    this.$cookies = $cookies
    console.log($cookies.getAll())
    this.message = 'this is the greatest twitter of All Time'
    this.loginBoo = true
    this.email
    this.user.password = $cookies.get('password')
    this.user.username = $cookies.get('username')
    this.repeatPassword
    $log.debug('HomeController instantiated')
  }

  signUp () {
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
          username: this.username,
          password: this.password
        },
        'profile': {
          email: this.email
        }
      }
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  login () {
    let cookies = this.$cookies
    let user = this.user

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
      // cookies.put('userId', response.data.id)
      cookies.put('username', user.username)
      cookies.put('password', user.password)
      console.log(cookies.getAll())
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  continueDisabled () {
    return !this.$game.exists()
  }

  loginClicked () {
    if (this.loginBoo) {
      this.login()
      console.log('login user')
    } else {
      this.loginBoo = true
    }
  }

  signUpClicked () {
    if (!this.loginBoo) {
      // verify password is the same
      // make sure post command works
      this.signUp()
      console.log('sign up user')
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

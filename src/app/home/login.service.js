export class LoginService {

  constructor ($log, $http) {
    'ngInject'
    this.$http = $http
    this.message = 'this is the greatest twitter of All Time'
    this.loginBoo = true
    this.email
    this.password
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
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/validate/username/exists/@' + this.user.username,
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

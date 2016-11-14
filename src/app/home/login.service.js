export class LoginService {

  // username = 'username or email'
  password = 'pw'

  constructor ($log) {
    'ngInject'
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
  }
}

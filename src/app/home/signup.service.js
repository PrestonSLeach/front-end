export class SignupService {

  username = 'user'
  password = 'pw'
  email = 'email'
  phonenumber = '0123456789'

  constructor ($log) {
    'ngInject'
    $log.debug('SignupService instantiated')
    // init($cookie)
  }
}

export class EditUserService {

  constructor ($log, $http, $cookies) {
    'ngInject'
    this.$http = $http
    // fields listed in edit profile
    this.editUserForm
    this.$cookies = $cookies
    // optional?
    // editPrivacy
    $log.debug('EditUserService instantiated')
  }

  editUser () {
    let cookies = this.$cookies
    this.inProgress = false
    this.$http({
      method: 'PATCH',
      url: 'http://localhost:8080/users/@' + cookies.get('username'),
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        credentials: {
          username: 'myUsername',
          password: 'password'
        },
        profile: {
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNumber: this.user.phoneNumber
        }
      }
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  deleteAccount () {
    let cookies = this.$cookies
    this.$http({
      method: 'DELETE',
      url: 'http://localhost:8080/users/@' + cookies.get('username'),
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      data: {
        username: 'myUsername',
        password: 'password'
      }
    }).then(function successCallback (response) {
      console.log(cookies.get('username'))
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  clear () {
    this.inProgress = false
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

  user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

}

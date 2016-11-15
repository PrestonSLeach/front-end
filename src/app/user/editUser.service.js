export class EditUserService {

  constructor ($log, $http) {
    'ngInject'
    this.$http = $http
    // fields listed in edit profile
    this.username
    this.password
    this.firstName
    this.lastName
    this.phoneNumber
    this.email
    this.editUserForm
    // optional?
    // editPrivacy
    $log.debug('EditUserService instantiated')
  }

  editUser () {
    this.$http({
      method: 'PATCH',
      url: 'http://localhost:8080/users/@myUsername',
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
          email: 'emailfc ghcf g',
          firstName: 'firstcf ghgfcName',
          lastName: 'lasthuc gName',
          phoneNumber: 'phone number'
        }
      }
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  deleteAccount () {
    this.$http({
      method: 'DELETE',
      url: 'http://localhost:8080/users/@myUsername',
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

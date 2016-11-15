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
      url: 'http://localhost:8080/users/@{username}',
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
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''

  };

}

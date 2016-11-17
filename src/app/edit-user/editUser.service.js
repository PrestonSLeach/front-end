export class EditUserService {

  constructor ($log, $http, $cookies, $config, $location) {
    'ngInject'
    this.$http = $http
    this.$cookies = $cookies
    this.$config = $config
    this.$location = $location
    $log.debug('EditUserService instantiated')
  }

  editUser () {
    let cookies = this.$cookies
    let location = this.$location
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
          username: cookies.get('username'),
          password: cookies.get('password')
        },
        profile: {
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNumber: this.user.phoneNumber
        }
      }
    }).then(function successCallback (response) {
      location.path('/user')
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  deleteAccount () {
    let cookies = this.$cookies
    let location = this.$location
    this.$http({
      method: 'DELETE',
      url: 'http://localhost:8080/users/@' + cookies.get('username'),
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
      cookies.remove('username')
      cookies.remove('password')
      location.path('/login')
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  populateProfileInfo () {
    let cookies = this.$cookies
    let userWorks = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + cookies.get('username'),
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      userWorks.user.firstName = response.data.profile.firstName
      userWorks.user.lastName = response.data.profile.lastName
      userWorks.user.phoneNumber = response.data.profile.phoneNumber
      userWorks.user.email = response.data.profile.email
      console.log(response.data)
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  cancel () {
    let location = this.$location
    this.inProgress = false
    location.path('/user')
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

export class UserViewService {
  constructor ($log, $config, $editUser, $http, $cookies, $stateParams, $user) {
    'ngInject'
    this.$config = $config
    this.$editUser = $editUser
    this.$http = $http
    this.$cookies = $cookies
    this.$user
    this.getMostRecentUsers
    this.populateProfileInfo()
    $log.debug('UserViewService instantiated!')
  }

  populateProfileInfo () {
    let cookies = this.$cookies
    let userService = this
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + cookies.get('username'),
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }).then(function successCallback (response) {
      userService.user.username = response.data.username
      if (response.data.profile.firstName !== undefined) userService.user.firstName = response.data.profile.firstName
      if (response.data.profile.lastName !== undefined) userService.user.lastName = response.data.profile.lastName
      userService.user.email = response.data.profile.email
      if (response.data.profile.phone !== undefined) userService.user.phone = response.data.profile.phone
    }, function errorCallback (response) {
      console.log(response)
    })
  }

  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

}

/* @ngInject */
export function configure ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/home')
  $locationProvider.html5Mode(true)
}

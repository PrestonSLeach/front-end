import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
  constructor ($log, $http, $q, $timeout) {
    this.$log = $log
    this.$log.debug('AppController instantiated')
    var originatorEv;
    this.$http = $http
    this.$q = $q
    var self = this;
    this.loadAll()
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.querySearch   = this.querySearch();
   self.selectedItemChange = this.selectedItemChange();
   self.searchTextChange   = this.searchTextChange();

    this.openMenu = function($mdOpenMenu, ev) {
      console.log('open clicked');
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.openProfile = function() {
    //redirect to users profile
    }



  }

  loadAll() {
    console.log('loadall')
    var allStates= []
          let appController = this
          this.$http({
            method: 'GET',
            url: 'http://localhost:8080/tags',
            headers: {
              'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000/'
            }
          }).then(function successCallback (response) {
            appController.states = response.data
            console.log('done loading')
          }, function errorCallback (response) {
            console.log(response)
          })
          return allStates;
      }

    querySearch(query) {
      console.log('insert query')
      if (!query) return;
            var results = query ? this.states.filter( createFilterFor(query) ) : this.states,
                deferred;

            return results;

        }

        searchTextChange(text) {
          if (text === null || text === "" || text === undefined)
        return [];

          console.log('textchange')
            this.$log.info('Text changed to ' + text);
        }

        selectedItemChange(item) {
          if (item === null || item === "" || item === undefined)
        return [];
          console.log('itemquery')
            this.$log.info('Item changed to ' + JSON.stringify(item));
        }

}

export const app = {
  templateUrl,
  controller: AppController,
  controllerAs: '$app'
}

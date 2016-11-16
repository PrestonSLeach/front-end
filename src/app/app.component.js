import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
    constructor($log, $http, $q, $timeout) {
        var self = this;
        this.$http = $http
        self.simulateQuery = false;
        self.isDisabled = false;

        // list of `state` value/display objects
        this.loadAll();
        console.log('states is below')
        console.log(self.states)
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        self.newState = newState;
        this.wtf = 'wtf'

        function newState(state) {
            alert("Sorry! You'll need to create a Constitution for " + state + " first!");
        }

        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `states` list of key/value pairs
         */


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }

        function findLabel(state) {
            return state.label === 'idiot';
        }


    }
    loadAll () {
        var allStates = []
        var control = this
        console.log('control below')
        console.log(control)
        this.$http({
            method: 'GET',
            url: 'http://localhost:8080/tags',
            headers: {
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/'
            }
        }).then(function successCallback(response) {
            allStates = response.data
            allStates = allStates.map(function (state) {
                return {
                    value: state.label.substring(1),
                    display: state.label
                };
            });
            console.log(allStates);
            control.states = allStates
            loadUsersIntoAll()
        }, function errorCallback(response) {
            console.log(response)
        })
    }
    loadUsersIntoAll () {
        var allStates = []
        var control = this
        console.log('control below')
        console.log(control)
        this.$http({
            method: 'GET',
            url: 'http://localhost:8080/users',
            headers: {
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/'
            }
        }).then(function successCallback(response) {
            allStates = response.data
            allStates = allStates.map(function (state) {
                return {
                    value: state.label.substring(1),
                    display: state.label
                };
            });
            console.log(allStates);
            control.states.concat(allStates)
        }, function errorCallback(response) {
            console.log(response)
        })
    }
}

export const app = {
    templateUrl,
    controller: AppController,
    controllerAs: '$app'
}

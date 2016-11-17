import templateUrl from './user.component.html'

/* @ngInject */
class UserController {
  constructor ($log, $user, $editUser, $mdSidenav, $timeout, $scope, $stateParams) {
    this.$state = $user
    // this.$state.init($stateParams.tag)
    this.username = $stateParams.user
    $user.getTweetsByUser(this.username)
    this.message = 'User HTML not yet done'
    $editUser.inProgress = false
    $log.debug('UserController instantiated')


    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
    };

    $scope.people = [
        { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
        { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
        { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
    ];

    $scope.goToPerson = function(person, event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Navigating')
                .textContent('Inspect ' + person)
                .ariaLabel('Person inspect demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };

    $scope.navigateTo = function(to, event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Navigating')
                .textContent('Imagine being taken to ' + to)
                .ariaLabel('Navigation demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };

    $scope.doPrimaryAction = function(event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Primary Action')
                .textContent('Primary actions can be used for one click actions')
                .ariaLabel('Primary click demo')
                .ok('Awesome!')
                .targetEvent(event)
        );
    };

    $scope.doSecondaryAction = function(event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Secondary Action')
                .textContent('Secondary actions can be used for one click actions')
                .ariaLabel('Secondary click demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };

    function buildToggler(navID) {
        return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }

  }

  // continueDisabled () {
  //   return !this.$game.exists()
  // }


}

export const user = {
  templateUrl,
  controller: UserController,
  controllerAs: '$user'
}

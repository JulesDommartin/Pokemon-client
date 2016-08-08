(function () {

  'use strict';
  
  angular
    .module('com.module.core')
    .controller('MainCtrl', function ($scope, $rootScope, $location, $state, $window, AppAuth, ENV) {

      $scope.menuoptions = $rootScope.menu;

      AppAuth.getUser()
        .then((user) => {
          $scope.currentUser = user;
        })
        .catch(() => {
          var route1;
          var path = $location.path().split('/');
          if (path.length > 1)
            route1 = path[1];

          if(route1 != "register" && route1 != "reset" && route1 != "activated") {
            $state.go('login');
          }
        });

      $scope.logout = function () {
      	AppAuth.logout(() => {
      		$window.location.href = "http://" + ENV.mainUrl;
      	});
      };

      $scope.profile = function () {
        $state.go('app.profile');
      }
 
    });

})();

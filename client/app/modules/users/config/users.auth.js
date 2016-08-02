(function () {
  'use strict';
  angular
    .module('com.module.users')
    .config(function ($httpProvider, $locationProvider) {
      $httpProvider.interceptors.push(function ($q, $location, $rootScope, $window, ENV) {
        return {
          responseError: function (rejection) {
            if (rejection.status === 401) {

              $location.nextAfterLogin = $location.path();

              if ($location.path() === '/router' || $location.path() ===
                '/login') {
                console.log(rejection);
                console.log('401 while on router on login path');
              } else {
                if ($location.path() !== '/register') {
                  $location.path('/#/login');
                  console.log("Go to login");  
                }
                console.log("Not logged in, redirected to login page");
              }
            }
            return $q.reject(rejection);
          }
        };
      });
    });

})();

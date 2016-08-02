(function () {
  'use strict';
  angular
    .module('com.module.users')
    .config(function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          template: '<login></login>',
          controller: 'LoginCtrl',
        })
        .state('register', {
          url: '/register',
          template: '<register></register>',
          controller: 'RegisterCtrl'
        });
    });

})();

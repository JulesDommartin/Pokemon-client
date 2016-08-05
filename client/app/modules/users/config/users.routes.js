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
        })
        .state('app.profile', {
          url: '/profile',
          templateUrl: 'modules/users/views/profile.html',
          controller: 'ProfileCtrl',
          controllerAs : 'ctrl',
          resolve : {
            me: function (UserService) {
              return UserService.me();
            }
          }
        });
    });

})();

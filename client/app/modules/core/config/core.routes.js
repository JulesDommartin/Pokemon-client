(function() {

  'use strict';

  angular
    .module('com.module.core')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100%"></div>',
          controller: 'RouteCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">Une erreur est survenue.</div>'
        })
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'modules/core/views/app.html',
          controller: 'MainCtrl',
        })
        .state('app.home', {
          url: '',
          templateUrl: 'modules/core/views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'ctrl',
          resolve: {
            me: function (UserService) {
              return UserService.me();
            }
          }
        });
      $urlRouterProvider.otherwise('/router');
    });

})();

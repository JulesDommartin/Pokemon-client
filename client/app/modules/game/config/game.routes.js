(function () {

  'use strict';

  angular
    .module('com.module.game')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app.game', {
          abstract: true,
          url: '/game',
          templateUrl: 'modules/game/views/main.html'
        })
        .state('app.game.main', {
          url: '',
          templateUrl: 'modules/game/views/main.game.html',
          controller: 'MainGameCtrl',
          controllerAs: 'ctrl',
          resolve: {
            me: function (UserService) {
              return UserService.me();
            }
          }
        });
    });

}) ();

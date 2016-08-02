(function () {

  'use strict';

  angular
    .module('com.module.moves')
    .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('app.moves', {
          abstract: true,
          url: '/moves',
          templateUrl: 'modules/moves/views/main.html'
        })
        .state('app.moves.list', {
          url: '',
          templateUrl: 'modules/moves/views/moves.main.html',
          controller: 'ListMovesCtrl',
          controllerAs: 'ctrl',
          resolve : {
            moves : function (MoveService) {
              return MoveService.findAll();
            }
          }
        });

    });

})();

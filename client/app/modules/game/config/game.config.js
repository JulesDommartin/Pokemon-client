(function () {

  'use strict';

  angular
    .module('com.module.game')
    .run(function ($rootScope) {
      $rootScope.addMenu("Game", 'app.game.main', ' fa-gamepad');
    });

}) ();

(function () {

  'use strict';
  
  angular
    .module('com.module.core')
    .controller('MainCtrl', function ($scope, $rootScope) {

      $scope.menuoptions = $rootScope.menu;

    });

})();

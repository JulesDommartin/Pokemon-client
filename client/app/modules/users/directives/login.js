(function () {

  'use strict';

  angular
    .module('com.module.users')
    .directive('login', function () {
      return {
        templateUrl: 'modules/users/views/login.html',
        restrict: 'E'
      };
    });

})();

(function () {

  'use strict';

  angular
  .module('com.module.core')
  .controller('HomeCtrl', function (AppAuth) {
    AppAuth.setToken();
  });


})();

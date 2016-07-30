(function () {

  'use strict';

  angular
  .module('com.module.core')
  .controller('HomeCtrl', function (AppAuth, $cookies) {
    AppAuth.getToken();
    console.log($cookies.get('access_token'));
  });


})();

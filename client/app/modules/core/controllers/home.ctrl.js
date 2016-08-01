(function () {

  'use strict';

  angular
  .module('com.module.core')
  .controller('HomeCtrl', function (AppAuth, $cookies) {
  
  	console.log($cookies.get('access_token'));

  });


})();

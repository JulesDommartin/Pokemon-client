(function () {

  'use strict';

  angular
  .module('com.module.core')
  .controller('HomeCtrl', function (AppAuth, $cookies) {
  
  	console.log(AppAuth.accessToken);

    console.log($cookies.get('access_token'));
  
  });


})();

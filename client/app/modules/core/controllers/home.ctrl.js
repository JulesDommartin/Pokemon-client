(function () {

  'use strict';

  angular
  .module('com.module.core')
  .controller('HomeCtrl', function (AppAuth, $cookies, me) {

  	this.currentUser = me;

  });


})();

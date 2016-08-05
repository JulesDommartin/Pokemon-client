(function () {

	'use strict';

	angular
		.module('com.module.users')
		.controller('ProfileCtrl', function(me, $scope) {

			console.log(me);

			this.me = me;

		});

})();
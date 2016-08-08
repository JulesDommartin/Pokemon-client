(function () {

	'use strict';

	angular
		.module('com.module.capture')
		.run(function ($rootScope) {
			$rootScope.addMenu('Capture', 'app.capture.main', 'fa-dot-circle-o');
		});

})();
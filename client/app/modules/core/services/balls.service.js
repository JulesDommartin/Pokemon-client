(function () {
	
	'use strict';

	angular
		.module('com.module.core')
		.service('BallService', function () {

			this.POKEBALL = "Pokeball";
			this.SUPERBALL = "Superball";
			this.HYPERBALL = "Hyperball";
			this.MASTERBALL = "Masterball";

		});

})();
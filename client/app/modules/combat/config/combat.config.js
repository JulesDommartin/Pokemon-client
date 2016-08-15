(function () {

	'use strict';

	angular
		.module('com.module.combat')
		.run(function ($rootScope) {
			$rootScope.addMenu("Combattre", 'app.combat.main', 'fa-bolt');
		});

}) ();
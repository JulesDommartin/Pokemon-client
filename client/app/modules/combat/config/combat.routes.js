(function () {
	
	'use strict';

	angular
		.module('com.module.combat')
		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('app.combat', {
					abstract: true,
					url: '/combat',
					templateUrl: 'modules/combat/views/main.html'
				})
				.state('app.combat.main', {
					url: '',
					templateUrl: 'modules/combat/views/combat.main.html',
					controller: 'MainCombatCtrl',
					controllerAs: 'ctrl'
				});
		});

}) ();
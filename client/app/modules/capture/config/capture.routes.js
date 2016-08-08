(function () {

	'use strict';

	angular
		.module('com.module.capture')
		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('app.capture', {
					abstract: true,
					url: '/capture',
					templateUrl : '/modules/capture/views/main.html'
				})
				.state('app.capture.main', {
					url: '',
					templateUrl: '/modules/capture/views/capture.main.html',
					controller: 'MainCaptureCtrl',
					controllerAs: 'ctrl',
					resolve: {
						pokemons : function (PokemonService) {
							return PokemonService.findAll();
						},
						me : function (UserService) {
							return UserService.me();
						},
						moves : function (MoveService) {
							return MoveService.findAll();
						}
					}
				});

		});

})();
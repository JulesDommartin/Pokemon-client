(function () {

	'use strict';

	angular
		.module('com.module.combat')
		.controller('BattleCombatCtrl', function (me, $stateParams, $state) {

			var pokemon = $stateParams.pokemon;

			if (pokemon == undefined || pokemon == null) {
				$state.go('^.main');
			} else {
				this.pokemon = pokemon;
			}


		});

}) ();
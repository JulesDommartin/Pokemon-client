(function () {
	
	'use strict';

	angular
		.module('com.module.combat')
		.controller('MainCombatCtrl', function (me, pokemons, PokemonService, $state) {
			this.NB_MAX_POKEMONS = 4;
			this.LEVEL_MIN = 2;
			this.LEVEL_MAX = 4;
			this.CATCHABLE_POKEMONS = [16,19];

			this.me = me;

			PokemonService.setPokemons(pokemons);

			this.pokemons = PokemonService.getRandomPokemons(this.NB_MAX_POKEMONS, this.CATCHABLE_POKEMONS, this.LEVEL_MIN, this.LEVEL_MAX);

			this.combattre = function (pokemon) {
				$state.go('app.combat.battle', {pokemon:pokemon});
			};

		});

}) ();
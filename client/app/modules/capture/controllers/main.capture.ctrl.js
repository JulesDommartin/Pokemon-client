(function () {
	
	'use strict';

	angular
		.module('com.module.capture')
		.controller('MainCaptureCtrl', function (pokemons, me, moves, PokemonService, DresseurService) {
			
			this.NB_MAX_POKEMONS = 3;
			this.LEVEL_MIN = 2;
			this.LEVEL_MAX = 5;
			this.CATCHABLE_POKEMONS = [16];
			this.allPokemons = pokemons;
			this.moves = moves;
			this.me = me;

			PokemonService.setPokemons(this.allPokemons);
			PokemonService.setMoves(this.moves);
			this.pokemons = PokemonService.getRandomPokemons(this.NB_MAX_POKEMONS, this.CATCHABLE_POKEMONS, this.LEVEL_MIN, this.LEVEL_MAX);

			console.log(this.pokemons);

			this.lancerPokeball = function (pokemon) {
				var random = Math.random();
				if (random > 0.5) {
					return true;
				} else {
					return false;
				}
			};

			this.capture = function (pokemon) {
				console.log(pokemon);
				if (this.pokemons.includes(pokemon)) {
					if (this.lancerPokeball(pokemon)) {
						console.log('Ce ' + pokemon.name + ' a été capturé par ' + this.me.pseudo);
						PokemonService.capture(pokemon, this.me._id)
							.then((res) => {
								if (this.me.equipePokemons.length < 6) {
									console.log(res);
									var position = this.me.equipePokemons.length + 1;
									this.me.equipePokemons.push({
										pokemon : res._id,
										position : position
									});
									DresseurService.updateTeam(this.me.pseudo, this.me.equipePokemons)
										.then((res) => {
											console.log('Il a été placé dans votre équipe');
											console.log(res);
										})
										.catch((err) => {
											console.log(err);
										});
								} else {
									console.log('Il a été placé dans la boîte de votre PC');
								}
							})
							.catch((err) => {
								console.log('Une erreur est survenue. ');
								console.log(err);
							});
					} else {
						console.log('Ce pokémon n\'a pas été capturé, réessayez');
					}
				} else {
					console.log('Ce pokémon n\'est pas dans la liste');
				}
			};

		});

})();
(function () {
	
	'use strict';

	angular
		.module('com.module.capture')
		.controller('MainCaptureCtrl', function (pokemons, me, moves, PokemonService, DresseurService, BallService) {
			
			this.NB_MAX_POKEMONS = 2;
			this.LEVEL_MIN = 2;
			this.LEVEL_MAX = 5;
			this.CATCHABLE_POKEMONS = [150];
			this.allPokemons = pokemons;
			this.moves = moves;
			this.me = me;



			PokemonService.setPokemons(this.allPokemons);
			PokemonService.setMoves(this.moves);
			this.pokemons = PokemonService.getRandomPokemons(this.NB_MAX_POKEMONS, this.CATCHABLE_POKEMONS, this.LEVEL_MIN, this.LEVEL_MAX);

			console.log(this.pokemons);

			this.lancerPokeball = function (pokemon, pokeballType, cb) {
				if (pokeballType == BallService.MASTERBALL) {
					return cb(true);
				} else {
					var N;
					var ball, ball_shakes;
					if (pokeballType == BallService.POKEBALL) {
						N = Math.floor(Math.random() * 256);
						ball = 12;
					} else if (pokeballType == BallService.SUPERBALL) {
						ball = 8;
						N = Math.floor(Math.random() * 201);
					} else {
						ball = 12;
						N = Math.floor(Math.random() * 151);
					}
					var status_treshold;
					var f = Math.round((pokemon.stats[5].value * 255 * 4) / (pokemon.hp_left * ball));
					if (pokemon.status == "ASLEEP" || pokemon.status == "FROZEN") {
						status_treshold = 25;
					} else if (pokemon.status == "PARALYZED" || pokemon.status == "BURNED" || pokemon.status == "POISONED") {
						status_treshold = 12;
					} else {
						status_treshold = 0;
					}
					if ((pokemon.status == "ASLEEP" || pokemon.status == "FROZEN") && N < 25) {
						return cb(true);
					} else if ((pokemon.status == "PARALYZED" || pokemon.status == "BURNED" || pokemon.status == "POISONED") && N < 12) {
						return cb(true);
					} else if (N - status_treshold > pokemon.taux_capture) {
						return cb(false, f);
					} else {
						var M = Math.floor(Math.random() * 256);
						if (f >= M ) {
							return cb(true);
						} else {
							return cb(false, f);
						}
 					}
				}
			};

			this.getNumberOfShakes = function (pokemon, pokeballType, f) {
				var ball;
				if (pokeballType == BallService.POKEBALL) {
					ball = 255;
				} else if (pokeballType == BallService.SUPERBALL) {
					ball = 200;
				} else {
					ball = 150;
				}
				var d = (pokemon.taux_capture * 100) / ball;
				if (d >= 256) {
					return 3;
				} else {
					var status_treshold;
					if (pokemon.status == "ASLEEP" || pokemon.status == "FROZEN") {
						status_treshold = 10;
					} else if (pokemon.status == "PARALYZED" || pokemon.status == "BURNED" || pokemon.status == "POISONED") {
						status_treshold = 5;
					} else {
						status_treshold = 0;
					}
					var x = Math.round(( d * f ) / 255) + status_treshold;
					if (x < 10) {
						return 0;
					} else if (x < 30) {
						return 1;
					} else if (x < 70) {
						return 2;
					} else {
						return 3;
					}
				}
			};

			this.capture = function (pokemon) {
				console.log(pokemon);
				if (this.pokemons.includes(pokemon)) {
					this.lancerPokeball(pokemon, "Pokeball", (res, f) => {
						if (res) {
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
						} else if (!res && f) {
							var shakes = this.getNumberOfShakes(pokemon, "Pokeball", f);
							console.log('Ce pokémon n\'a pas été capturé, réessayez');
						} else {
							console.log('Ce pokémon n\'a pas été capturé, réessayez');
						}
					});
				} else {
					console.log('Ce pokémon n\'est pas dans la liste');
				}
			};

		});

})();
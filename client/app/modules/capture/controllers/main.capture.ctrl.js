(function () {
	
	'use strict';

	angular
		.module('com.module.capture')
		.controller('MainCaptureCtrl', function (pokemons, me, moves, PokemonService, DresseurService, BallService) {
			
			this.NB_MAX_POKEMONS = 2;
			this.LEVEL_MIN = 80;
			this.LEVEL_MAX = 90;
			this.CATCHABLE_POKEMONS = [150];
			this.allPokemons = pokemons;
			this.moves = moves;
			this.me = me;



			PokemonService.setPokemons(this.allPokemons);
			PokemonService.setMoves(this.moves);
			this.pokemons = PokemonService.getRandomPokemons(this.NB_MAX_POKEMONS, this.CATCHABLE_POKEMONS, this.LEVEL_MIN, this.LEVEL_MAX);

			console.log(this.pokemons);

			this.getBonusStatut = function (status) {
				if (status == "FROZEN" || status == "ASLEEP") {
					return 2;
				} else if (status == "PARALYZED" || status == "POISONED" || status == "BURNED") {
					return 1.5;
				} else {
					return 1;
				}
			};

			this.getBonusBall = function (pokeballType) {
				if (pokeballType == BallService.MASTERBALL) {
					return 255;
				} else if (pokeballType == BallService.HYPERBALL) {
					return 2;
				} else if (pokeballType == BallService.SUPERBALL) {
					return 1.5;
				} else {
					return 1;
				}
			};

			this.getFirstStepCatching = function (pokemon, bonusBall, bonusStatut) {
				return Math.round((((3 * pokemon.stats[5].value) - (2 * pokemon.hp_left)) * pokemon.taux_capture * bonusBall * bonusStatut) / (3 * pokemon.stats[5].value));
			};

			this.getSecondStepCatching = function (a) {
				return Math.round(65535 * Math.pow(a/255,1/4));
			};

			this.lancerPokeball = function (pokemon, pokeballType, cb) {
				var bonusStatut;
				if (pokemon.status) {
					bonusStatut = this.getBonusStatut(pokemon.status);
				} else {
					bonusStatut = 1;
				}
				var bonusBall = this.getBonusBall(pokeballType);
				var a = this.getFirstStepCatching(pokemon, bonusBall, bonusStatut);
				console.log(a);
				if (a >= 255) {
					return cb(true);
				} else {
					var b = this.getSecondStepCatching(a); 
					var shakes = 0;

					for (var i = 0; i < 4; i++) {
						var random = Math.floor(Math.random() * 65536);
						if (random <= b) {
							shakes++;
						}
					}

					if (shakes == 4) {
						return cb(true);
					} else {
						return cb(false, shakes);
					}

				}
			};

			this.capture = function (pokemon) {
				console.log(pokemon);
				if (this.pokemons.includes(pokemon)) {
					this.lancerPokeball(pokemon, "Pokeball", (res, shakes) => {
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
						} else if (!res && shakes) {
							console.log("La ball a remué " + shakes + " fois");
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
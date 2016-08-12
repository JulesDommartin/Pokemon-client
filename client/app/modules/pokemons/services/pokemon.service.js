(function () {

  'use strict';

  angular
    .module('com.module.pokemons')
    .service('PokemonService', function (Pokemon, PokemonDresseur) {

      this.statsName = ["speed", "special-defense", "special-attack", "defense", "attack", "hp"];


      var vm = this;

      this.setPokemons = function (pokemons) {
        console.log(pokemons);
        this.pokemons = pokemons;
      };

      this.setMoves = function (moves) {
        console.log(moves);
        this.moves = moves;
      };

      this.getPokemons = function () {
        return this.pokemons;
      };

      this.getMoves = function () {
        return this.moves;
      };

      this.sortBy = function (field, reverse, primer) {
        var key = primer ?
          function(x) { return primer(x[field]); } :
          function(x) { return x[field]; };

        reverse = !reverse ? 1 : -1;

        return function(a, b) {
          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
      };



      this.findAll = function () {
        return Pokemon.findAll({}).$promise;
      };

      this.insert = function (pokemon) {
        return Pokemon.insert(pokemon).$promise;
      };

      this.findFromAPI = function (number) {
        return Pokemon.findFromAPI({
          number : number
        }).$promise;
      };

      this.findMine = function () {
        return PokemonDresseur.findMine().$promise;
      };

      this.getMovesAtThisLevel = function (pokemon, level) {
        var moves = [];
        for (var i = 0; i < pokemon.moves.length; i++) {
          if (level == pokemon.moves[i].level_learned_at) {
            moves.push(this.getMoveId(pokemon.moves[i].name) - 1);
          }
        }
        return moves;
      };

      this.getMovesFromLevel = function (pokemon, level) {
        var current_moves = [];
        for (var i = 0; i < pokemon.moves.length; i++) {
          if (level <= pokemon.moves[i].level_learned_at) {
            for (var j = 0; j < this.getMovesAtThisLevel(pokemon, level).length; j++) {
              current_moves.push(this.getMovesAtThisLevel(pokemon, level)[j]);
            }
            var length = current_moves.length;
            for (var j = i - 1; j >= 0 && j >= i - (4 - length); j--) {
              console.log(pokemon.moves[j].name);
              current_moves.push(this.getMoveId(pokemon.moves[j].name) - 1);
            }
            break;
          } else if (i == pokemon.moves.length - 1) {
            for (var j = pokemon.moves.length - 1; j >= 0; j--) {
              current_moves.push(this.getMoveId(pokemon.moves[j].name) - 1);
            } 
            break;
          }
        }
        return current_moves;
      };

      this.getMoveId = function (english) {
        console.log(english);
        for (var i = 0; i < this.moves.length; i++) {
          if (english.toUpperCase().replace("-", " ") == this.moves[i].names.en.toUpperCase().replace("-", " ")) {
            console.log(this.moves[i]);
            console.log(this.moves[i].id);
            return this.moves[i].id;
          }
        }
        return null;
      };

      this.getRandomIvs = function () {
        var ivs = [];
        for (var i = 0; i < 6; i++) {
          var iv = {
            name : this.statsName[i],
            value : Math.floor(Math.random() * 31) + 1
          };
          ivs.push(iv);
        }
        return ivs;
      };

      this.getDefaultEvs = function () {
        var evs = [];
        for (var i = 0; i < 6; i++) {
          evs.push({
            name : this.statsName[i],
            value : 0
          });
        }
        return evs;
      };

      this.getStats = function (pokemon, level, ivs, evs) {
        var stats = [];
        var S;
        for (var i = 0; i < 6; i++) {
          if (i == 5) {
            S = level + 10;
          } else {
            S = 5;
          }
          var stat = {
            name : this.statsName[i],
            value : Math.floor((2 * pokemon.stats[i].base_stat + ivs[i].value + Math.floor(evs[i].value / 4)) * (level / 100)) + S
          };
          stats.push(stat);
        }
        return stats;
      };

      this.getBaseStats = function (stats) {
        var base_stats = [];
        for (var i = 0; i < stats.length; i++) {
          base_stats.push({
            name : vm.statsName[i],
            value : stats[i].base_stat
          });
        }
        return base_stats;
      };

      this.Pokemon = function (pokemon, level) {
        var allMoves = pokemon.moves.sort(vm.sortBy('level_learned_at', false, null));
        var moves = vm.getMovesFromLevel(pokemon, level);
        var ivs = vm.getRandomIvs();
        var evs = vm.getDefaultEvs();
        var stats = vm.getStats(pokemon, level, ivs, evs);
        var newPokemon = {
          id : pokemon.id,
          name : pokemon.name,
          level : level,
          base_stats : vm.getBaseStats(pokemon.stats),
          stats : stats,
          moves : vm.getMovesFromLevel(pokemon, level),
          hp_left : stats[5].value,
          ivs : ivs,
          evs : evs,
          taux_capture : pokemon.taux_capture
        };
        return newPokemon;
      };

      this.getRandomPokemons = function (NB_MAX_POKEMONS, CATCHABLE_POKEMONS, LEVEL_MIN, LEVEL_MAX) {
        var pokemons = [];
        var used = [];

        for (var i = 0; i < NB_MAX_POKEMONS; i++) {
          var random = Math.floor(Math.random() * CATCHABLE_POKEMONS.length);
          used.push(random);
        }

        for (var i = 0; i < used.length; i++) {
          var level = parseInt(Math.random() * (LEVEL_MAX - LEVEL_MIN + 1)) + LEVEL_MIN;
          var pokemonInstance = new this.Pokemon(this.pokemons[CATCHABLE_POKEMONS[used[i]] - 1], level);
          pokemons.push(pokemonInstance);
        }

        return pokemons;
      };

      this.capture = function (pokemon, userId) {
        pokemon.userId = userId;
        return PokemonDresseur.insert(pokemon).$promise;
      };

      this.relacher = function (id) {
        return PokemonDresseur.delete({
          id: id
        }).$promise;
      }; 

    });

})();

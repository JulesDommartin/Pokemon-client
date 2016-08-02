(function (){

  'use strict';

  angular
    .module('com.module.pokemons')
    .controller('ListPokemonsCtrl', function ($cookies, mesPokemons, pokemons, PokemonService, AppAuth, PokemonAuth) {

      if ($cookies.get('current_id') === undefined) {
        this.currentId = 1;
      } else {
        this.currentId = $cookies.get('current_id');
      }

      this.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      this.pokemons = pokemons;

      this.mesPokemons = mesPokemons;

      this.pokemon = {
        id: null,
        name: "",
        weight: null,
        height: null,
        base_experience: null,
        moves: [],
        sprites: {},
        stats: []
      };

      this.createPokemonFromAPI = function (obj) {
        let pokemonInstance = {
          id: null,
          name: "",
          weight: null,
          height: null,
          base_experience: null,
          moves: [],
          sprites: {},
          stats: []
        };
        pokemonInstance.id = obj.id;
        pokemonInstance.name = this.capitalizeFirstLetter(obj.name);
        pokemonInstance.weight = obj.weight;
        pokemonInstance.height = obj.height;
        pokemonInstance.base_experience = obj.base_experience;
        pokemonInstance.sprites = {
          front: obj.sprites.front_default,
          back: obj.sprites.back_default,
          front_shiny: obj.sprites.front_shiny,
          back_shiny: obj.sprites.back_shiny
        };
        obj.stats.forEach((stat) => {
          pokemonInstance.stats.push({
            name: stat.stat.name,
            base_stat: stat.base_stat
          });
        });
        obj.moves.forEach((move) => {
          if (move.version_group_details[0].level_learned_at !== 0) {
            pokemonInstance.moves.push({
              name: move.move.name,
              level_learned_at: move.version_group_details[0].level_learned_at
            });
          }
        });
        PokemonService.insert(pokemonInstance)
          .then((data) => {
            console.log(pokemonInstance.name + " inséré dans la base ! ");
          })
          .catch((err) => {
            console.log(err);
          });
      };

      this.findFromAPI = function (number) {
        PokemonService.findFromAPI(number)
          .then((data) => {
            this.createPokemonFromAPI(data.data);
          })
          .catch((err) => {
            if (err.data !== null && typeof err.data === 'object') {
              this.createPokemonFromAPI(err.data);
          }
        });
      };

      // this.chercherPokemonSuivant = function (id) {
      //   console.log("On cherche : " + id);
      //   this.findFromAPI(id);
      //   $cookies.remove('current_id');
      //   var nextId = parseInt(id) + 1;
      //   $cookies.put('current_id', nextId);
      //   setTimeout(() => { location.reload(); }, 7000);
      // };

      // if (this.currentId <= 151) {
      //   this.chercherPokemonSuivant(this.currentId);
      // }

    });

})();

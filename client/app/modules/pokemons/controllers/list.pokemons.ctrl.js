(function (){

  'use strict';

  angular
    .module('com.module.pokemons')
    .controller('ListPokemonsCtrl', function ($cookies, $http, me, pokemons, moves, PokemonService, AppAuth, PokemonAuth, DresseurService, GetURLService) {

      if ($cookies.get('current_id') === undefined) {
        this.currentId = 1;
      } else {
        this.currentId = $cookies.get('current_id');
      }

      this.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      this.pokemons = pokemons;
      this.moves = moves;
      this.me = me;

      for (var i = 0; i < this.pokemons.length; i++) {
        if (!this.pokemons[i].taux_capture) {
          console.log(this.pokemons[i].name);
        }
      }

      console.log(this.moves);
      console.log(this.me);

      this.sortBy = function (field, reverse, primer) {
        var key = primer ?
          function(x) { return primer(x[field]); } :
          function(x) { return x[field]; };

        reverse = !reverse ? 1 : -1;

        return function(a, b) {
          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
      };

      this.getPokemonFromList = function (id, pos) {
        var pokemon;
        for (var i = 0; i < this.me.listePokemons.length; i++) {
          if (this.me.listePokemons[i]._id == id) {
            pokemon = this.me.listePokemons[i];
            break;
          }
        };
        return pokemon;
      };

      this.constructPokemonTeam = function () {
        var team = [];

        this.me.equipePokemons.sort(this.sortBy('position', false, parseInt));

        for (var i = 0; i < this.me.equipePokemons.length; i++) {
          var pokemon = this.getPokemonFromList(this.me.equipePokemons[i].pokemon, this.me.equipePokemons[i].position);
          team.push(pokemon);
        }

        this.me.equipePokemons = team;

      };

      this.constructPokemonTeam();

      console.log(this.me.equipePokemons);

      this.getColor = function (pokemon) {
        var green = {
          r : 112,
          g : 219,
          b : 112
        };
        var orange = {
          r : 255,
          g : 163,
          b : 51
        };
        var red = {
          r : 255,
          g : 50,
          b : 50
        };
        if (pokemon.hp_left / pokemon.stats[5].value > 0.5) {
          return green;
        } else if (pokemon.hp_left / pokemon.stats[5].value <= 0.5 && pokemon.hp_left / pokemon.stats[5].value > 0.2) {
          return orange;
        } else {
          return red;
        }
      };

      this.relacher = function (pokemon) {
        var index = this.me.equipePokemons.indexOf(pokemon);
        this.me.equipePokemons.splice(index, 1);
        console.log(this.me.equipePokemons);
        DresseurService.updateTeam(this.me.pseudo, this.me.equipePokemons);
        console.log(pokemon._id);
        PokemonService.relacher(pokemon._id);
      };


      this.parseHtml = function (html) {
        $('#getHtml').append(html);
      };

      // GetURLService.requestUrl('http://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration')
      //   .then((res) => {
      //     // console.log(res.documentElement.outerHTML);
      //     this.parseHtml(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });



      // this.createPokemonFromAPI = function (obj) {
      //   let pokemonInstance = {
      //     id: null,
      //     name: "",
      //     weight: null,
      //     height: null,
      //     base_experience: null,
      //     moves: [],
      //     sprites: {},
      //     stats: []
      //   };
      //   pokemonInstance.id = obj.id;
      //   pokemonInstance.name = this.capitalizeFirstLetter(obj.name);
      //   pokemonInstance.weight = obj.weight;
      //   pokemonInstance.height = obj.height;
      //   pokemonInstance.base_experience = obj.base_experience;
      //   pokemonInstance.sprites = {
      //     front: obj.sprites.front_default,
      //     back: obj.sprites.back_default,
      //     front_shiny: obj.sprites.front_shiny,
      //     back_shiny: obj.sprites.back_shiny
      //   };
      //   obj.stats.forEach((stat) => {
      //     pokemonInstance.stats.push({
      //       name: stat.stat.name,
      //       base_stat: stat.base_stat
      //     });
      //   });
      //   obj.moves.forEach((move) => {
      //     if (move.version_group_details[0].level_learned_at !== 0) {
      //       pokemonInstance.moves.push({
      //         name: move.move.name,
      //         level_learned_at: move.version_group_details[0].level_learned_at
      //       });
      //     }
      //   });
      //   PokemonService.insert(pokemonInstance)
      //     .then((data) => {
      //       console.log(pokemonInstance.name + " inséré dans la base ! ");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // };

      // this.findFromAPI = function (number) {
      //   PokemonService.findFromAPI(number)
      //     .then((data) => {
      //       this.createPokemonFromAPI(data.data);
      //     })
      //     .catch((err) => {
      //       if (err.data !== null && typeof err.data === 'object') {
      //         this.createPokemonFromAPI(err.data);
      //     }
      //   });
      // };

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

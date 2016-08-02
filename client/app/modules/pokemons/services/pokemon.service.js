(function () {

  'use strict';

  angular
    .module('com.module.pokemons')
    .service('PokemonService', function (Pokemon, PokemonDresseur) {

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

    });

})();

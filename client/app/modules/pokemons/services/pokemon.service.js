(function () {

  'use strict';

  angular
    .module('com.module.pokemons')
    .service('PokemonService', function (Pokemon) {

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

    });

})();

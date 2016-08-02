(function () {

  'use strict';

  angular
    .module('com.module.moves')
    .service('MoveService', function (Move) {

      this.findAll = function () {
        return Move.findAll({}).$promise;
      };

      this.insert = function (pokemon) {
        return Move.insert(pokemon).$promise;
      };

      this.findFromAPI = function (number) {
        return Move.findFromAPI({
          number : number
        }).$promise;
      };

    });

})();

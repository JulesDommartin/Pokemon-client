(function () {

  'use strict';

  angular
    .module('com.module.pokemons')
    .run(function ($rootScope) {

      $rootScope.addMenu('Mes Pokémons','app.pokemons.list','fa-list-ul');

    });

})();

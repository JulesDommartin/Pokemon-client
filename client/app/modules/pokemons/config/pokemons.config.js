(function () {

  'use strict';

  angular
    .module('com.module.pokemons')
    .run(function($rootScope) {

      $rootScope.addMenu('Pokémons','app.pokemons.list','fa-list-ul');

    });

})();

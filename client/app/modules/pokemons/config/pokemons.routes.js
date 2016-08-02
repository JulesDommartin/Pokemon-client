(function () {

  'use strict';

  angular
    .module('com.module.pokemons')
    .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('app.pokemons', {
          abstract: true,
          url: '/pokemons',
          templateUrl: 'modules/pokemons/views/main.html'
        })
        .state('app.pokemons.list', {
          url: '',
          templateUrl: 'modules/pokemons/views/pokemons.main.html',
          controller: 'ListPokemonsCtrl',
          controllerAs: 'ctrl',
          resolve : {
            mesPokemons : function (PokemonService) {
              return PokemonService.findMine();
            },
            pokemons : function (PokemonService) {
              return PokemonService.findAll();
            }
          }
        });

    });

})();

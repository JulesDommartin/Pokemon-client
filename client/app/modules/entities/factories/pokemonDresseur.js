(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "PokemonDresseur",
    ['PokemonResource', 'ServerService', function(Resource, ServerService) {
      var urlBase = ServerService.url() + "/api";
      var R = Resource(
          urlBase + "/",
        {
          'id': '@id',
        },
        {
          "findAll": {
            isArray: true,
            url: urlBase + "/pokemonsdresseur",
            method: "GET"
          },
          "findById": {
            url: urlBase + "/pokemonsdresseur/find/:id",
            method: "GET",
          },
          "findMine": {
            isArray: true,
            url: urlBase + "/pokemonsdresseur/mine",
            method: "GET"
          },
          "insert": {
            url: urlBase + "/pokemonsdresseur",
            method: "POST"
          },
          "delete": {
            url: urlBase + "/pokemonsdresseur/:id",
            method: "DELETE"
          }
        }
      );

      R.modelName = "PokemonDresseur";

      return R;
    }]
  );
})();

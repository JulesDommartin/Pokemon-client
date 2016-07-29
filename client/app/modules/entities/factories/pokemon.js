(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "Pokemon",
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
            url: urlBase + "/pokemons",
            method: "GET"
          },
          "findById": {
            url: urlBase + "/pokemons/:id",
            method: "GET",
          },
          "findFromAPI": {
            url: urlBase + "/utils/pokemons?number=:number",
            method: "GET"
          },
          "insert": {
            url: urlBase + "/pokemons",
            method: "POST"
          }
        }
      );

      R.modelName = "Pokemon";

      return R;
    }]
  );
})();

(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "Move",
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
            url: urlBase + "/moves",
            method: "GET"
          },
          "findById": {
            url: urlBase + "/moves/:id",
            method: "GET",
          },
          "findFromAPI": {
            url: urlBase + "/utils/moves/?number=:number",
            method: "GET"
          },
          "insert": {
            url: urlBase + "/moves",
            method: "POST"
          }
        }
      );

      R.modelName = "Move";

      return R;
    }]
  );
})();

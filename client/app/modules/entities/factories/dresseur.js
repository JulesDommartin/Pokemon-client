(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "Dresseur",
    ['PokemonResource', 'ServerService', function(Resource, ServerService) {
      var urlBase = ServerService.url() + "/api";
      var R = Resource(
          urlBase + "/",
        {
          'id': '@id',
          'pseudo' : '@pseudo'
        },
        {
          "findAll": {
            isArray: true,
            url: urlBase + "/dresseurs",
            method: "GET"
          },
          "findByPseudo": {
            url: urlBase + "/dresseurs/:pseudo",
            method: "GET",
          },
          "insert": {
            url: urlBase + "/dresseurs",
            method: "POST"
          },
          "update": {
            url: urlBase + "/dresseurs/:pseudo",
            method: "PUT"
          }
        }
      );

      R.modelName = "Move";

      return R;
    }]
  );
})();

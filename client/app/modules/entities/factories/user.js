(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "User",
    ['PokemonResource', 'ServerService', function(Resource, ServerService) {
      var urlBase = ServerService.url() + "/api";
      var R = Resource(
          urlBase + "/",
        {
          'id': '@id',
          'email': '@email',
          'pseudo': '@pseudo'
        },
        {
          "findAll": {
            isArray: true,
            url: urlBase + "/users",
            method: "GET"
          },
          "findExistant": {
            url: urlBase + "/users/:pseudo",
            method: "GET",
          },
          "create": {
            url: urlBase + "/users",
            method: "POST"
          },
          "me": {
            url: urlBase + "/users/me",
            method: "GET"
          },
          "register": {
            url: urlBase + "/users/register",
            method: "POST"
          }
        }
      );

      R.modelName = "User";

      return R;
    }]
  );
})();

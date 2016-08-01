(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "AccessToken",
    ['PokemonResource', 'ServerService', function(Resource, ServerService) {
      var urlBase = ServerService.url() + "/api";
      var R = Resource(
        urlBase + "/token/",
        {},
        {
          "request": {
            url: urlBase + "/token",
            method: "POST",
          }
        }
      );

      R.modelName = "AccessToken";

      return R;
    }]
  );
})();

(function () {
  'use strict';

  angular
  .module('com.module.entities')
  .factory(
    "Url",
    ['PokemonResource', 'ServerService', function(Resource, ServerService) {
      var urlBase = ServerService.url() + "/api";
      var R = Resource(
        urlBase + "/utils/url",
        {},
        {
          "request": {
            url: urlBase + "/utils/url",
            method: "POST",
          }
        }
      );

      R.modelName = "Url";

      return R;
    }]
  );
})();

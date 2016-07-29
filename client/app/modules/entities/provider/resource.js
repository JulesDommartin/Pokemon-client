(function () {
  'use strict';

  var urlBase = "/api";

  angular
  .module('com.module.entities')
  .provider('PokemonResource', function PokemonResourceProvider() {

    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, methods) {
        var defaults = {
          update: { method: 'put', isArray: false },
          create: { method: 'post' }
        };

        methods = angular.extend(defaults, methods);

        var resource = $resource(url, params, methods);

        resource.prototype.$save = function() {
          if (!this.id) {
            return this.$create();
          }
          else {
            return this.$update();
          }
        };

        return resource;
      };
    }];

  });
})();

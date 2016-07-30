(function (undefined) {
  'use strict';

  angular
  .module('com.module.entities')
  .factory("PokemonAuth", function($cookies, URLService) {

    function PokemonAuth() {
    }

    PokemonAuth.prototype.setToken = function(accessToken) {
      this.accessToken = accessToken;
    };

    PokemonAuth.prototype.clearToken = function() {
      $cookies.remove('access_token', { domain: URLService.domain() });
      this.accessToken = null;
    };

    PokemonAuth.prototype.getToken = function() {
      this.accessToken = $cookies.get('access_token');
      return this.accessToken !== null;
    };

    PokemonAuth.prototype.save = function(ttl) {
      if (this.accessToken !== null) {
        if(ttl)
          $cookies.put('access_token', this.accessToken, { domain: URLService.domain(), end: ttl });
        else
          $cookies.put('access_token', this.accessToken, { domain: URLService.domain() });
      } else
        return false;
    };

    return new PokemonAuth();
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('PokemonAuthRequestInterceptor');
  }])
  .factory('PokemonAuthRequestInterceptor', [ '$q', 'PokemonAuth',
  function($q, PokemonAuth) {
    return {
      request: function($config) {
        if (PokemonAuth.accessToken) {
          $config.headers.authorization = "Bearer " + PokemonAuth.accessToken;
        } else {
          console.log("No auth");
        }
        return $config;
      }
    };
  }]);
})();

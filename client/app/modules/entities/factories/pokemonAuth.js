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
      console.log(this.accessToken);
      return this.accessToken !== undefined;
    };

    PokemonAuth.prototype.save = function(remember) {
      if (this.accessToken !== undefined) {
        if (remember) {
          $cookies.put('access_token', this.accessToken, {domain: URLService.domain()});
        } else {
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          console.log(expireDate);
          $cookies.put('access_token', this.accessToken, {'expires': expireDate, domain: URLService.domain()});
        }
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
          var res = {
            body: { error: { status: 401 } },
            status: 401,
            config: $config,
            headers: function() { return undefined; }
          };
          return $q.reject(res);
        }
        return $config || $q.when($config);
      }
    };
  }]);
})();

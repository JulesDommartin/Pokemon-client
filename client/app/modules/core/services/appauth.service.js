(function () {
  'use strict';

  angular
    .module('com.module.core')
    .factory('AppAuth', function ($cookies, PokemonAuth) {
      var self = {
        setToken: function () {
          if (PokemonAuth.getToken()) {
            console.log("Connecté");
          } else {
            console.log("Pas connecté");
          }
        }
      };
      return self;
    })
    .run(($cookies) => {
      $cookies.put("access_token","Ksd_dn98dsdapKLdsf21");
      var token = $cookies.get("access_token");
      console.log(token);
    });

})();

(function () {
  'use strict';

  angular
    .module('com.module.core')
    .factory('AppAuth', function ($cookies, PokemonAuth, $q) {
      var self = {
        login: function () {
          return $q((res, err) => {
            if (PokemonAuth.getToken()) {
              res("Connecté");
            } else {
              err("Non connecté");
            }
          });
        },
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
    .run(($cookies, AppAuth) => {
      $cookies.put("access_token","Ksd_dn98dsdapKLdsf21");
      var token = $cookies.get("access_token");
      console.log(token);
      AppAuth.login();
    });

})();

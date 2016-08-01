(function () {
  'use strict';

  angular
    .module('com.module.core')
    .factory('AppAuth', function ($cookies, PokemonAuth, AccessToken, User, $q) {
      var self = {
        login: function (data) {
          return $q((res, err) => {
            if (PokemonAuth.getToken()) {
              User.me().$promise
              .then(function(user) {
                self.currentUser = user;
                res(self.currentUser);
              })
            } else if (data !== undefined) {
              if (data.pseudo && data.password) {
                AccessToken.request({
                  pseudo: data.pseudo,
                  password: data.password
                }).$promise
                .then((response) => {
                  PokemonAuth.setToken(response.token);
                  PokemonAuth.save(data.rememberMe);
                  User.me().$promise
                  .then((user) => {
                    self.currentUser = user;
                    res(user);
                  });
                })
                .catch((error) => {
                  err(error);
                });
                // res(token);
              } else {
                err("Non connecté");
              }
            } else {
              err("Non connectééé");
            }
          });
        }
      };
      return self;
    });
})();

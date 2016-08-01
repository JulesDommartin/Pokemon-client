(function () {
  'use strict';
  angular
    .module('com.module.core')
    .controller('RouteCtrl', function (AppAuth, $state) {

      AppAuth.login({})
        .then(function (user) {
          if (user !== null && user !== undefined) {
            $state.go('app.home');
          } else {
            $state.go('login');
          }
        })
        .catch(function(error) {
          console.log("Error while reconnecting:");
          console.log(error);
          console.log("Redirect to login");
          $state.go('login');
        });

    });
})();
